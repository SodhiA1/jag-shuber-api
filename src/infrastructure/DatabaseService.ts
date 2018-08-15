import { GetFieldBlock, PostgresDelete, PostgresInsert, PostgresSelect, PostgresSquel, PostgresUpdate } from 'squel';
import { Database } from '../db/Database';
import { ServiceBase } from './ServiceBase';
import { ClientBase } from 'pg';
import { DatabaseError, isDatabaseError, ValidationError } from '../common/Errors'
import { ValidateError, FieldErrors } from 'tsoa';
import { Inject, AutoWired } from 'typescript-ioc';
import { DatabaseRecordMetadata, DatabaseMetadataFieldMap } from './DatabaseRecordMetadata';

export type DatabaseResult<T> = { rows: T[] }

@AutoWired
export abstract class DatabaseService<T> extends ServiceBase<T> {
    @Inject
    private _db!: Database;
    protected get db() {
        return this._db;
    }

    private _dbClient?: ClientBase = undefined;
    set dbClient(client: ClientBase | undefined) {
        this._dbClient = client;
    }

    get dbClient(): ClientBase | undefined {
        return this._dbClient;
    }

    get squel(): PostgresSquel {
        return this.db.squel;
    }

    get dbTableName(): string {
        return this.tableName;
    }

    getAliasedFieldMap(alias: string) {
        return Object.keys(this.fieldMap).reduce((newFields, key) => {
            newFields[`${alias}.${key}`] = this.fieldMap[key];
            return newFields;
        }, {});
    }

    constructor(protected tableName: string, protected primaryKey: string) {
        super();
    }

    abstract get fieldMap(): { [key: string]: string };

    protected async executeQuery<T>(query: string): Promise<T[]> {
        try {
            let result: DatabaseResult<T> = { rows: [] };
            // if there is a dbClient defined, use it
            if (this.dbClient) {
                result = (await this.dbClient.query(query) as DatabaseResult<T>);
            } else {
                result = (await this.db.executeQuery(query) as DatabaseResult<T>);
            }
            return result.rows || [];
        } catch (error) {
            let returnError = error;
            DatabaseError.decorate(returnError);
            if (isDatabaseError(returnError)) {
                // Error codes can be found here: https://www.postgresql.org/docs/9.6/static/errcodes-appendix.html
                if (error.code === "23505") {
                    const matches = error.detail.match(DatabaseError.PG_ERROR_23505_REGEX);
                    if (matches.length > 0) {
                        const field = matches[1];
                        const value = matches[2];
                        const message = "Already Exists";
                        const fieldErrors: FieldErrors = {};
                        fieldErrors[this.fieldMap[field]] = {
                            message,
                            value
                        }
                        returnError = new ValidateError(fieldErrors, "ValidationError");
                    }
                }
            }
            console.log('Error during DB Query:', `${returnError!.message}\r\n${returnError!.detail}`);
            throw returnError;
        }
    }

    protected getReturningFields(): GetFieldBlock {
        const returnFields = new this.squel.cls.GetFieldBlock({ autoQuoteAliasNames: true });
        returnFields.fields(this.fieldMap);
        return returnFields;
    }

    protected getSelectQuery(id?: string): PostgresSelect {
        const query = this.squel.select({ autoQuoteAliasNames: true })
            .from(this.tableName)
            .fields(this.fieldMap);
        if (id) {
            query.where(`${this.primaryKey}='${id}'`)
        }
        return query;
    }

    protected getInsertQuery(entity: Partial<T>): PostgresInsert {
        const query = this.db.insertQuery(this.tableName, this.primaryKey)
            .returning(this.getReturningFields());
        this.setQueryFields(query, entity);
        return query;
    }

    protected getUpdateQuery(entity: Partial<T>): PostgresUpdate {
        const query = this.db.updateQuery(this.tableName);

        // Map object properties into object
        this.setQueryFields(query, entity);

        // Set the returning fields
        query.returning(this.getReturningFields().toString());

        const primKeyPropName = this.fieldMap[this.primaryKey];
        const primaryKeyValue = entity[primKeyPropName];

        if (!primaryKeyValue) {
            throw Error("Id property required for updating records");
        }
        query.where(`${this.primaryKey}='${primaryKeyValue}'`);
        return query;
    }

    protected getUnsafeDeleteQuery(): PostgresDelete {
        return this.squel.delete()
            .from(this.tableName);
    }

    protected getDeleteQuery(id: string): PostgresDelete {
        return this.getUnsafeDeleteQuery()
            .where(`${this.primaryKey}='${id}'`);
    }

    protected setQueryFields(query, entity, includePK: boolean = false) {
        // Take the Field Map keys and map properties from the object
        Object.keys(this.fieldMap).filter(k => includePK || k !== this.primaryKey).forEach(dbField => {
            const objectPropName = this.fieldMap[dbField];
            const propValue = entity[objectPropName];
            query.set(dbField, propValue != undefined ? propValue : null);
        });
    }

    async getMetadataById(id: string): Promise<T & DatabaseRecordMetadata>{
        const query = this.getSelectQuery(id);
        query.fields(DatabaseMetadataFieldMap);
        const rows = await this.executeQuery<DatabaseRecordMetadata & T>(query.toString());
        return rows[0];
    }

    async getAll(): Promise<T[]> {
        const query = this.getSelectQuery();
        const rows = await this.executeQuery<T>(query.toString());
        return rows.map((s: T) => this.filterNullValues(s));
    };

    async getById(id: string): Promise<T | undefined> {
        const query = this.getSelectQuery(id);
        const rows = await this.executeQuery<T>(query.toString());
        return rows[0];
    }

    async create(entity: Partial<T>): Promise<T> {
        const query = this.getInsertQuery(entity);
        const rows = await this.executeQuery<T>(query.toString());
        return rows[0];
    }

    async update(entity: Partial<T>): Promise<T> {
        const query = this.getUpdateQuery(entity);
        const rows = await this.executeQuery<T>(query.toString());
        return rows[0];
    }

    async delete(id: string): Promise<void> {
        const query = this.getDeleteQuery(id);
        await this.executeQuery(query.toString());
    }

}
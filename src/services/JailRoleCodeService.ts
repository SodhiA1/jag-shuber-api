import { JailRoleCode } from '../models/JailRoleCode';
import ExpirableDatabaseService from '../infrastructure/ExpirableDatabaseService';
import { AutoWired } from 'typescript-ioc';
import { PostgresInsert } from 'squel';

@AutoWired
export class JailRoleCodeService extends ExpirableDatabaseService<JailRoleCode> {
    fieldMap = {
        jail_role_id: 'id',
        jail_role_code: 'code',
        description: 'description',
        location_id: 'locationId',
        effective_date: 'effectiveDate',
        expiry_date: 'expiryDate',
        created_by: 'createdBy',
        updated_by: 'updatedBy',
        created_dtm: 'createdDtm',
        updated_dtm: 'updatedDtm',
        revision_count: 'revisionCount'
    };

    constructor() {
        super('jail_role_code', 'jail_role_id');
    }

    async getAll(locationId?: string, includeProvincial?: boolean) {
        includeProvincial = includeProvincial || true
        const query = super.getSelectQuery();
        if (locationId) {
            if (includeProvincial) {
                query.where(`location_id='${locationId}' OR location_id IS NULL`);
            } else {
                query.where(`location_id='${locationId}'`);
            }
        } else {
            query.where(`location_id IS NULL`);
        };
        query.order(`location_id IS NOT NULL, code`)
        const rows = await this.executeQuery<JailRoleCode>(query.toString());
        return rows;
    }

    async getByCode(code: string) {
        const query = this.getSelectQuery()
            .where(`jail_role_code='${code}'`)
            .limit(1);

        const rows = await this.executeQuery<JailRoleCode>(query.toString());
        return rows[0];
    }

    async getByCodeAndLocation(code: string, locationId?: string) {
        let query = this.getSelectQuery()
            .where(`jail_role_code='${code}'`)

        query = (locationId !== null) 
            ? query.where(`location_id='${locationId}'`) 
            : query.where(`location_id IS NULL`)

        const rows = await this.executeQuery<JailRoleCode>(query.toString());
        return rows[0];
    }

    protected getInsertQuery(entity: Partial<JailRoleCode>): PostgresInsert {
        const query = this.db.insertQuery(this.tableName, this.primaryKey)
            .returning(this.getReturningFields());
        this.setQueryFields(query, entity);

        // Take the Field Map keys and map properties from the object
        const objectPropName = this.fieldMap[this.effectiveField];
        const propValue = entity[objectPropName];

        if (!propValue) {
            // If the effective date field was not provided
            // Set it to NOW
            query.set(this.effectiveField, this.squel.str('NOW()'));
        }
        return query;
    }

}
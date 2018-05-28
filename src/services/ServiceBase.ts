import { v4 as uuid } from 'uuid';
import { ICrudService } from "../infrastructure";
import { default as moment, Moment } from 'moment';

export abstract class ServiceBase<T> implements ICrudService<T> {
    abstract getAll(): Promise<T[]>;
    abstract getById(id: string): Promise<T | undefined>;
    abstract create(entity: Partial<T>): Promise<T>
    abstract update(entity: Partial<T>): Promise<T>;
    abstract delete(id: string): Promise<void>;

    generateUuid(): string {
        return uuid();
    }

    filterNullValues<T>(object: any): T {
        let returnObj = {};
        Object.keys(object)
            .filter(k => object[k] !== null)
            .forEach(k => {
                returnObj[k] = object[k];
            })
        return returnObj as T;
    }

    adjustForTimezone(momentToAdjust: Moment): Moment {
        const pacificTimeZoneOffset = 7 * 60; // 7 hours * 60 minutes
        const timeOffset = moment(momentToAdjust).utcOffset() + pacificTimeZoneOffset;
        return moment(momentToAdjust).add(timeOffset, 'minutes');
    }
}
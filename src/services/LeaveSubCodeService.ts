import ExpirableDatabaseService, { EffectiveQueryOptions } from '../infrastructure/ExpirableDatabaseService';
import { LeaveSubCode } from '../models/LeaveSubCode';
import { AutoWired } from 'typescript-ioc';

@AutoWired
export class LeaveSubCodeService extends ExpirableDatabaseService<LeaveSubCode> {
    fieldMap = {
        leave_code: 'code',
        leave_sub_code: 'subCode',
        description: 'description',
        expiry_date: 'expiryDate'
    };

    constructor() {
        super('leave_sub_code', 'leave_sub_code');
    }

    async getAll(options?: EffectiveQueryOptions): Promise<LeaveSubCode[]> {
        const query = super.getEffectiveSelectQuery(options);
    
        const rows = await this.executeQuery<LeaveSubCode>(query.toString());
        return rows;    
    }
}
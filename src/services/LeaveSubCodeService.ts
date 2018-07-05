import ExpirableDatabaseService from './ExpirableDatabaseService';
import { LeaveSubCode } from '../models/LeaveSubCode';


export class LeaveSubCodeService extends ExpirableDatabaseService<LeaveSubCode> {
    fieldMap = {
        leave_code: 'code',
        leave_sub_code: 'subCode',
        description: 'description'
    };

    constructor() {
        super('leave_sub_code', 'leave_sub_code');
    }

}
import { JailRoleCode } from '../models/JailRoleCode';
import ExpirableDatabaseService from './ExpirableDatabaseService';
import { LeaveCode } from '../models/LeaveCode';


export class LeaveCodeService extends ExpirableDatabaseService<LeaveCode> {
    fieldMap = {
        leave_code: 'code',
        description: 'description'
    };

    constructor() {
        super('leave_code', 'leave_code');
    }

}
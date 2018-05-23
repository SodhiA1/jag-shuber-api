import { SheriffDuty } from "./SheriffDuty";

export interface Duty {
    id?: string;
    startDateTime: string;
    endDateTime: string;
    assignmentId: string;
    sheriffsRequired?: number;
    dutyRecurrenceId?: string;
    sheriffDuties?: SheriffDuty[]
}
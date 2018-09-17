/*
 ______  ______  ______  ______  ______  ______  ______  ______  ______  ______  ______ 
|______||______||______||______||______||______||______||______||______||______||______|
  ___          _                  _____                                 _             _ 
 / _ \        | |                |  __ \                               | |           | |
/ /_\ \ _   _ | |_  ___          | |  \/  ___  _ __    ___  _ __  __ _ | |_  ___   __| |
|  _  || | | || __|/ _ \         | | __  / _ \| '_ \  / _ \| '__|/ _` || __|/ _ \ / _` |
| | | || |_| || |_| (_) |        | |_\ \|  __/| | | ||  __/| |  | (_| || |_|  __/| (_| |
\_| |_/ \__,_| \__|\___/          \____/ \___||_| |_| \___||_|   \__,_| \__|\___| \__,_|
______                 _   _         _             ___  ___            _  _   __        
|  _  \               | \ | |       | |            |  \/  |           | |(_) / _|       
| | | | ___           |  \| |  ___  | |_           | .  . |  ___    __| | _ | |_  _   _ 
| | | |/ _ \          | . ` | / _ \ | __|          | |\/| | / _ \  / _` || ||  _|| | | |
| |/ /| (_) |         | |\  || (_) || |_           | |  | || (_) || (_| || || |  | |_| |
|___/  \___/          \_| \_/ \___/  \__|          \_|  |_/ \___/  \__,_||_||_|   \__, |
                                                                                   __/ |
                                                                                  |___/ 
 ______  ______  ______  ______  ______  ______  ______  ______  ______  ______  ______ 
|______||______||______||______||______||______||______||______||______||______||______|

Client is generated from swagger.json file
*/
import * as superAgent from "superagent";
import { TOKEN_COOKIE_NAME } from '../common/authentication';
import { TypedEvent } from '../common/TypedEvent';
import { retreiveCookieValue } from '../common/cookieUtils';
import { 

    Assignment,
    Region,
    Courthouse,
    Sheriff,
    Courtroom,
    JailRoleCode,
    OtherAssignCode,
    WorkSectionCode,
    SheriffRankCode,
    Run,
    Shift,
    MultipleShiftUpdateRequest,
    ShiftCopyOptions,
    DutyRecurrence,
    Duty,
    DutyImportDefaultsRequest,
    SheriffDuty,
    SheriffDutyAutoAssignRequest,
    Leave,
    LeaveCancelReasonCode,
    LeaveCode,
    LeaveSubCode,
    CourtRoleCode,
    GenderCode,
    User 
} from "./models"


export default class Client {
    private _previousToken:string | undefined | null = null;
    private _tokenChangedEvent = new TypedEvent<string|undefined>();
    /**
     * An event that is fired when the app token associated with this client
     * has changed.
     *
     * @readonly
     * @type {TypedEvent<string|undefined>}
     * @memberof Client
     */
    public get onTokenChanged() : TypedEvent<string|undefined> {
        return this._tokenChangedEvent;
    }
    
    /**
     * A hook to allow errors occured to be processed further before being thrown
     * out of the api client. This is useful for modifying validation errors etc.
     *
     * @memberof Client
     */
    public errorProcessor: (error:any) => Error = (e)=>e;
    
    constructor(private _agent:superAgent.SuperAgent<any> = superAgent.agent()){
    }

    /**
     * Returns the underlying SuperAgent instance being used for requests
     *
     * @readonly
     * @memberof Client
     */
    get agent() {
        return this._agent;
    }

    /**
     * Hook responsible for extracting the value out of the response
     *
     * @protected
     * @template T
     * @param {superAgent.Response} response
     * @returns {T}
     * @memberof Client
     */
    protected handleResponse<T>(response:superAgent.Response):T {
        return response.body as T;
    }

    /**
     * Ensures that a application token currently exists and fetches a new one
     * if the old one has expired or is not present.
     *
     * @protected
     * @returns {Promise<void>}
     * @memberof Client
     */
    protected async ensureToken(): Promise<void> {
        let token = retreiveCookieValue(TOKEN_COOKIE_NAME, this.agent);
        // if there is no token, we will go out and retreive one
        if (token == undefined) {
            try{
                console.log('Fetching new token');
                await this.GetToken();
            }catch(e){                
                console.error("Couldn't fetch token",e);
            }
        }
    }

    /**
     * Takes a token and handles emitting events if the token has changed
     *
     * @protected
     * @param {string} [tokenString]
     * @memberof Client
     */
    protected handleNewToken(token?:string){
        if(token !== this._previousToken){
            this._previousToken = token;
            this.onTokenChanged.emit(token);
        }
    }

    /**
     * All operations in the client are routed through this method which
     * is responsible for issuing and handling responses in a way which 
     * errors can be captured and processed within the client. 
     * This method also ensures that a client token exists before issuing the
     * request.
     *
     * @protected
     * @template T
     * @param {() => Promise<superAgent.Response>} worker
     * @returns {Promise<T>}
     * @memberof Client
     */
    protected async tryRequest<T>(worker: () => Promise<superAgent.Response>) : Promise<T> {
        try {
            await this.ensureToken();
            const response = await worker();
            return this.handleResponse(response);
        } catch (error) {
            if (this.errorProcessor) {
                throw this.errorProcessor(error);
            } else {
                throw error;
            }
        }
    }

    public async GetAssignments( courthouseId:string , startDate:string , endDate:string ):Promise<Array<Assignment>>{
        const params = { 
            "courthouseId":courthouseId,
            "startDate":startDate,
            "endDate":endDate 
        };
        return this.tryRequest<Array<Assignment>>(async () => {
            const response: superAgent.Response = await this.agent.get(`/Assignments`)
                .query(params)
            return response;
        });
    }    
    public async CreateAssignment( model:Assignment ):Promise<Assignment>{
        return this.tryRequest<Assignment>(async () => {
            const response: superAgent.Response = await this.agent.post(`/Assignments`)
                .send(model)
            return response;
        });
    }    
    public async GetAssignmentById( id:string ):Promise<Assignment>{
        return this.tryRequest<Assignment>(async () => {
            const response: superAgent.Response = await this.agent.get(`/Assignments/${id}`)
            return response;
        });
    }    
    public async UpdateAssignment( id:string , model:Assignment ):Promise<Assignment>{
        return this.tryRequest<Assignment>(async () => {
            const response: superAgent.Response = await this.agent.put(`/Assignments/${id}`)
                .send(model)
            return response;
        });
    }    
    public async ExpireAssignment( id:string ):Promise<void>{
        return this.tryRequest<void>(async () => {
            const response: superAgent.Response = await this.agent.post(`/Assignments/${id}`)
            return response;
        });
    }    
    public async DeleteAssignment( id:string ):Promise<void>{
        return this.tryRequest<void>(async () => {
            const response: superAgent.Response = await this.agent.delete(`/Assignments/${id}`)
            return response;
        });
    }    
    public async GetRegions():Promise<Array<Region>>{
        return this.tryRequest<Array<Region>>(async () => {
            const response: superAgent.Response = await this.agent.get(`/regions`)
            return response;
        });
    }    
    public async CreateRegion( model:Region ):Promise<Region>{
        return this.tryRequest<Region>(async () => {
            const response: superAgent.Response = await this.agent.post(`/regions`)
                .send(model)
            return response;
        });
    }    
    public async GetRegionById( id:string ):Promise<Region>{
        return this.tryRequest<Region>(async () => {
            const response: superAgent.Response = await this.agent.get(`/regions/${id}`)
            return response;
        });
    }    
    public async UpdateRegion( id:string , model:Region ):Promise<Region>{
        return this.tryRequest<Region>(async () => {
            const response: superAgent.Response = await this.agent.put(`/regions/${id}`)
                .send(model)
            return response;
        });
    }    
    public async DeleteRegion( id:string ):Promise<void>{
        return this.tryRequest<void>(async () => {
            const response: superAgent.Response = await this.agent.delete(`/regions/${id}`)
            return response;
        });
    }    
    public async GetCourthouses():Promise<Array<Courthouse>>{
        return this.tryRequest<Array<Courthouse>>(async () => {
            const response: superAgent.Response = await this.agent.get(`/courthouses`)
            return response;
        });
    }    
    public async CreateCourthouse( model:Courthouse ):Promise<Courthouse>{
        return this.tryRequest<Courthouse>(async () => {
            const response: superAgent.Response = await this.agent.post(`/courthouses`)
                .send(model)
            return response;
        });
    }    
    public async GetCourthouseById( id:string ):Promise<Courthouse>{
        return this.tryRequest<Courthouse>(async () => {
            const response: superAgent.Response = await this.agent.get(`/courthouses/${id}`)
            return response;
        });
    }    
    public async UpdateCourthouse( id:string , model:Courthouse ):Promise<Courthouse>{
        return this.tryRequest<Courthouse>(async () => {
            const response: superAgent.Response = await this.agent.put(`/courthouses/${id}`)
                .send(model)
            return response;
        });
    }    
    public async DeleteCourthouse( id:string ):Promise<void>{
        return this.tryRequest<void>(async () => {
            const response: superAgent.Response = await this.agent.delete(`/courthouses/${id}`)
            return response;
        });
    }    
    public async GetSheriffs( courthouseId:string ):Promise<Array<Sheriff>>{
        const params = { 
            "courthouseId":courthouseId 
        };
        return this.tryRequest<Array<Sheriff>>(async () => {
            const response: superAgent.Response = await this.agent.get(`/sheriffs`)
                .query(params)
            return response;
        });
    }    
    public async CreateSheriff( model:Sheriff ):Promise<Sheriff>{
        return this.tryRequest<Sheriff>(async () => {
            const response: superAgent.Response = await this.agent.post(`/sheriffs`)
                .send(model)
            return response;
        });
    }    
    public async GetSheriffById( id:string ):Promise<Sheriff>{
        return this.tryRequest<Sheriff>(async () => {
            const response: superAgent.Response = await this.agent.get(`/sheriffs/${id}`)
            return response;
        });
    }    
    public async UpdateSheriff( id:string , model:Sheriff ):Promise<Sheriff>{
        return this.tryRequest<Sheriff>(async () => {
            const response: superAgent.Response = await this.agent.put(`/sheriffs/${id}`)
                .send(model)
            return response;
        });
    }    
    public async DeleteSheriff( id:string ):Promise<void>{
        return this.tryRequest<void>(async () => {
            const response: superAgent.Response = await this.agent.delete(`/sheriffs/${id}`)
            return response;
        });
    }    
    public async GetCourtrooms( courthouseId:string ):Promise<Array<Courtroom>>{
        const params = { 
            "courthouseId":courthouseId 
        };
        return this.tryRequest<Array<Courtroom>>(async () => {
            const response: superAgent.Response = await this.agent.get(`/courtrooms`)
                .query(params)
            return response;
        });
    }    
    public async CreateCourtroom( model:Courtroom ):Promise<Courtroom>{
        return this.tryRequest<Courtroom>(async () => {
            const response: superAgent.Response = await this.agent.post(`/courtrooms`)
                .send(model)
            return response;
        });
    }    
    public async GetCourtroomById( id:string ):Promise<Courtroom>{
        return this.tryRequest<Courtroom>(async () => {
            const response: superAgent.Response = await this.agent.get(`/courtrooms/${id}`)
            return response;
        });
    }    
    public async UpdateCourtroom( id:string , model:Courtroom ):Promise<Courtroom>{
        return this.tryRequest<Courtroom>(async () => {
            const response: superAgent.Response = await this.agent.put(`/courtrooms/${id}`)
                .send(model)
            return response;
        });
    }    
    public async DeleteCourtroom( id:string ):Promise<void>{
        return this.tryRequest<void>(async () => {
            const response: superAgent.Response = await this.agent.delete(`/courtrooms/${id}`)
            return response;
        });
    }    
    public async GetJailRoleCodes():Promise<Array<JailRoleCode>>{
        return this.tryRequest<Array<JailRoleCode>>(async () => {
            const response: superAgent.Response = await this.agent.get(`/codes/jailroles`)
            return response;
        });
    }    
    public async GetOtherAssignCodes():Promise<Array<OtherAssignCode>>{
        return this.tryRequest<Array<OtherAssignCode>>(async () => {
            const response: superAgent.Response = await this.agent.get(`/codes/otherassign`)
            return response;
        });
    }    
    public async GetWorkSectionCodes():Promise<Array<WorkSectionCode>>{
        return this.tryRequest<Array<WorkSectionCode>>(async () => {
            const response: superAgent.Response = await this.agent.get(`/codes/worksection`)
            return response;
        });
    }    
    public async GetSheriffRankCodes():Promise<Array<SheriffRankCode>>{
        return this.tryRequest<Array<SheriffRankCode>>(async () => {
            const response: superAgent.Response = await this.agent.get(`/codes/sheriffrank`)
            return response;
        });
    }    
    public async GetRuns( courthouseId:string ):Promise<Array<Run>>{
        const params = { 
            "courthouseId":courthouseId 
        };
        return this.tryRequest<Array<Run>>(async () => {
            const response: superAgent.Response = await this.agent.get(`/runs`)
                .query(params)
            return response;
        });
    }    
    public async CreateRun( model:Run ):Promise<Run>{
        return this.tryRequest<Run>(async () => {
            const response: superAgent.Response = await this.agent.post(`/runs`)
                .send(model)
            return response;
        });
    }    
    public async GetRunById( id:string ):Promise<Run>{
        return this.tryRequest<Run>(async () => {
            const response: superAgent.Response = await this.agent.get(`/runs/${id}`)
            return response;
        });
    }    
    public async UpdateRun( id:string , model:Run ):Promise<Run>{
        return this.tryRequest<Run>(async () => {
            const response: superAgent.Response = await this.agent.put(`/runs/${id}`)
                .send(model)
            return response;
        });
    }    
    public async DeleteRun( id:string ):Promise<void>{
        return this.tryRequest<void>(async () => {
            const response: superAgent.Response = await this.agent.delete(`/runs/${id}`)
            return response;
        });
    }    
    public async GetShifts( courthouseId:string ):Promise<Array<Shift>>{
        const params = { 
            "courthouseId":courthouseId 
        };
        return this.tryRequest<Array<Shift>>(async () => {
            const response: superAgent.Response = await this.agent.get(`/Shifts`)
                .query(params)
            return response;
        });
    }    
    public async CreateShift( model:Shift ):Promise<Shift>{
        return this.tryRequest<Shift>(async () => {
            const response: superAgent.Response = await this.agent.post(`/Shifts`)
                .send(model)
            return response;
        });
    }    
    public async GetShiftById( id:string ):Promise<Shift>{
        return this.tryRequest<Shift>(async () => {
            const response: superAgent.Response = await this.agent.get(`/Shifts/${id}`)
            return response;
        });
    }    
    public async UpdateShift( id:string , model:Shift ):Promise<Shift>{
        return this.tryRequest<Shift>(async () => {
            const response: superAgent.Response = await this.agent.put(`/Shifts/${id}`)
                .send(model)
            return response;
        });
    }    
    public async DeleteShift( id:string ):Promise<void>{
        return this.tryRequest<void>(async () => {
            const response: superAgent.Response = await this.agent.delete(`/Shifts/${id}`)
            return response;
        });
    }    
    public async UpdateMultipleShifts( model:MultipleShiftUpdateRequest ):Promise<Array<Shift>>{
        return this.tryRequest<Array<Shift>>(async () => {
            const response: superAgent.Response = await this.agent.post(`/Shifts/multiple`)
                .send(model)
            return response;
        });
    }    
    public async CopyShifts( model:ShiftCopyOptions ):Promise<Array<Shift>>{
        return this.tryRequest<Array<Shift>>(async () => {
            const response: superAgent.Response = await this.agent.post(`/Shifts/copy`)
                .send(model)
            return response;
        });
    }    
    public async GetDutyRecurrences( startDate:string , endDate:string ):Promise<Array<DutyRecurrence>>{
        const params = { 
            "startDate":startDate,
            "endDate":endDate 
        };
        return this.tryRequest<Array<DutyRecurrence>>(async () => {
            const response: superAgent.Response = await this.agent.get(`/DutyRecurrences`)
                .query(params)
            return response;
        });
    }    
    public async CreateDutyRecurrence( model:DutyRecurrence ):Promise<DutyRecurrence>{
        return this.tryRequest<DutyRecurrence>(async () => {
            const response: superAgent.Response = await this.agent.post(`/DutyRecurrences`)
                .send(model)
            return response;
        });
    }    
    public async GetDutyRecurrenceById( id:string ):Promise<DutyRecurrence>{
        return this.tryRequest<DutyRecurrence>(async () => {
            const response: superAgent.Response = await this.agent.get(`/DutyRecurrences/${id}`)
            return response;
        });
    }    
    public async UpdateDutyRecurrence( id:string , model:DutyRecurrence ):Promise<DutyRecurrence>{
        return this.tryRequest<DutyRecurrence>(async () => {
            const response: superAgent.Response = await this.agent.put(`/DutyRecurrences/${id}`)
                .send(model)
            return response;
        });
    }    
    public async ExpireDutyRecurrence( id:string ):Promise<void>{
        return this.tryRequest<void>(async () => {
            const response: superAgent.Response = await this.agent.post(`/DutyRecurrences/${id}`)
            return response;
        });
    }    
    public async DeleteDutyRecurrence( id:string ):Promise<void>{
        return this.tryRequest<void>(async () => {
            const response: superAgent.Response = await this.agent.delete(`/DutyRecurrences/${id}`)
            return response;
        });
    }    
    public async GetDuties():Promise<Array<any>>{
        return this.tryRequest<Array<any>>(async () => {
            const response: superAgent.Response = await this.agent.get(`/Duty`)
            return response;
        });
    }    
    public async CreateDuty( model:Duty ):Promise<Duty>{
        return this.tryRequest<Duty>(async () => {
            const response: superAgent.Response = await this.agent.post(`/Duty`)
                .send(model)
            return response;
        });
    }    
    public async GetDutyById( id:string ):Promise<Duty>{
        return this.tryRequest<Duty>(async () => {
            const response: superAgent.Response = await this.agent.get(`/Duty/${id}`)
            return response;
        });
    }    
    public async UpdateDuty( id:string , model:Duty ):Promise<Duty>{
        return this.tryRequest<Duty>(async () => {
            const response: superAgent.Response = await this.agent.put(`/Duty/${id}`)
                .send(model)
            return response;
        });
    }    
    public async DeleteDuty( id:string ):Promise<void>{
        return this.tryRequest<void>(async () => {
            const response: superAgent.Response = await this.agent.delete(`/Duty/${id}`)
            return response;
        });
    }    
    public async ImportDefaultDuties( body:DutyImportDefaultsRequest ):Promise<Array<Duty>>{
        return this.tryRequest<Array<Duty>>(async () => {
            const response: superAgent.Response = await this.agent.post(`/Duty/import`)
                .send(body)
            return response;
        });
    }    
    public async GetSheriffDuties():Promise<Array<SheriffDuty>>{
        return this.tryRequest<Array<SheriffDuty>>(async () => {
            const response: superAgent.Response = await this.agent.get(`/SheriffDuty`)
            return response;
        });
    }    
    public async CreateSheriffDuty( model:SheriffDuty ):Promise<SheriffDuty>{
        return this.tryRequest<SheriffDuty>(async () => {
            const response: superAgent.Response = await this.agent.post(`/SheriffDuty`)
                .send(model)
            return response;
        });
    }    
    public async GetSheriffDutyById( id:string ):Promise<SheriffDuty>{
        return this.tryRequest<SheriffDuty>(async () => {
            const response: superAgent.Response = await this.agent.get(`/SheriffDuty/${id}`)
            return response;
        });
    }    
    public async UpdateSheriffDuty( id:string , model:SheriffDuty ):Promise<SheriffDuty>{
        return this.tryRequest<SheriffDuty>(async () => {
            const response: superAgent.Response = await this.agent.put(`/SheriffDuty/${id}`)
                .send(model)
            return response;
        });
    }    
    public async DeleteSheriffDuty( id:string ):Promise<void>{
        return this.tryRequest<void>(async () => {
            const response: superAgent.Response = await this.agent.delete(`/SheriffDuty/${id}`)
            return response;
        });
    }    
    public async AutoAssignSheriffDuties( model:SheriffDutyAutoAssignRequest ):Promise<Array<SheriffDuty>>{
        return this.tryRequest<Array<SheriffDuty>>(async () => {
            const response: superAgent.Response = await this.agent.post(`/SheriffDuty/auto-assign`)
                .send(model)
            return response;
        });
    }    
    public async GetLeaves():Promise<Array<Leave>>{
        return this.tryRequest<Array<Leave>>(async () => {
            const response: superAgent.Response = await this.agent.get(`/leaves`)
            return response;
        });
    }    
    public async CreateLeave( model:Leave ):Promise<Leave>{
        return this.tryRequest<Leave>(async () => {
            const response: superAgent.Response = await this.agent.post(`/leaves`)
                .send(model)
            return response;
        });
    }    
    public async GetLeaveById( id:string ):Promise<Leave>{
        return this.tryRequest<Leave>(async () => {
            const response: superAgent.Response = await this.agent.get(`/leaves/${id}`)
            return response;
        });
    }    
    public async UpdateLeave( id:string , model:Leave ):Promise<Leave>{
        return this.tryRequest<Leave>(async () => {
            const response: superAgent.Response = await this.agent.put(`/leaves/${id}`)
                .send(model)
            return response;
        });
    }    
    public async DeleteLeave( id:string ):Promise<void>{
        return this.tryRequest<void>(async () => {
            const response: superAgent.Response = await this.agent.delete(`/leaves/${id}`)
            return response;
        });
    }    
    public async GetLeaveCancelReasonCodes():Promise<Array<LeaveCancelReasonCode>>{
        return this.tryRequest<Array<LeaveCancelReasonCode>>(async () => {
            const response: superAgent.Response = await this.agent.get(`/codes/leave-cancel`)
            return response;
        });
    }    
    public async GetLeaveTypes():Promise<Array<LeaveCode>>{
        return this.tryRequest<Array<LeaveCode>>(async () => {
            const response: superAgent.Response = await this.agent.get(`/codes/leave-type`)
            return response;
        });
    }    
    public async GetLeaveSubCodes():Promise<Array<LeaveSubCode>>{
        return this.tryRequest<Array<LeaveSubCode>>(async () => {
            const response: superAgent.Response = await this.agent.get(`/codes/leave-sub-type`)
            return response;
        });
    }    
    public async GetCourtRoleCodes():Promise<Array<CourtRoleCode>>{
        return this.tryRequest<Array<CourtRoleCode>>(async () => {
            const response: superAgent.Response = await this.agent.get(`/codes/courtroles`)
            return response;
        });
    }    
    public async GetGenderCodes():Promise<Array<GenderCode>>{
        return this.tryRequest<Array<GenderCode>>(async () => {
            const response: superAgent.Response = await this.agent.get(`/codes/gender`)
            return response;
        });
    }    
    public async GetToken():Promise<any>{
        // For getting the token, we need to bypass the tryRequest as 
        // it will ensure token which will call this method again
        try{
            const response: superAgent.Response = await this.agent.get(`/token`)
            const { token:tokenString } = this.handleResponse<{ token: string }>(response);
            this.handleNewToken(tokenString);
            return tokenString;
        }catch(e){
            this.handleNewToken();
            throw e;
        }
    }    
    public async Logout():Promise<any>{
        await this.agent.post(`/token/delete`)
        this.handleNewToken();
    }    
    public async GetCurrentUser():Promise<User>{
        return this.tryRequest<User>(async () => {
            const response: superAgent.Response = await this.agent.get(`/User/me`)
            return response;
        });
    }    
}
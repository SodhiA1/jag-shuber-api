/* tslint:disable */
import { Controller, ValidateParam, FieldErrors, ValidateError, TsoaRoute } from 'tsoa';
import { AssignmentController } from './controllers/AssignmentController';
import { RegionController } from './controllers/RegionController';
import { CourthouseController } from './controllers/CourthouseController';
import { SheriffController } from './controllers/SheriffController';
import { CourtroomController } from './controllers/CourtroomController';
import { JailRoleCodesController } from './controllers/JailRoleCodesController';
import { OtherAssignCodesController } from './controllers/OtherAssignCodesController';
import { WorkSectionCodesController } from './controllers/WorkSectionCodesController';
import { SheriffRankCodesController } from './controllers/SheriffRankCodesController';
import { RunController } from './controllers/RunController';
import { ShiftController } from './controllers/ShiftController';
import { DutyRecurrenceController } from './controllers/DutyRecurrenceController';
import { DutyController } from './controllers/DutyController';
import { SheriffDutyController } from './controllers/SheriffDutyController';
import { LeaveController } from './controllers/LeaveController';
import { LeaveCancelCodesController } from './controllers/LeaveCancelCodesController';
import { LeaveTypeCodesController } from './controllers/LeaveTypeCodesController';
import { LeaveSubTypeCodesController } from './controllers/LeaveSubTypeCodesController';
import { CourtRoleCodesController } from './controllers/CourtRoleCodesController';
import { GenderCodesController } from './controllers/GenderCodesController';
import { TokenController } from './controllers/TokenController';
import { koaAuthentication } from './authentication';

const models: TsoaRoute.Models = {
    "DutyRecurrence": {
        "properties": {
            "id": { "dataType": "string" },
            "startTime": { "dataType": "string", "required": true },
            "endTime": { "dataType": "string", "required": true },
            "daysBitmap": { "dataType": "double", "required": true },
            "sheriffsRequired": { "dataType": "double", "required": true },
            "assignmentId": { "dataType": "string" },
        },
    },
    "Assignment": {
        "properties": {
            "id": { "dataType": "string" },
            "title": { "dataType": "string" },
            "workSectionId": { "dataType": "string", "required": true },
            "courthouseId": { "dataType": "string", "required": true },
            "courtroomId": { "dataType": "string" },
            "courtRoleId": { "dataType": "string" },
            "runId": { "dataType": "string" },
            "jailRoleCode": { "dataType": "string" },
            "otherAssignCode": { "dataType": "string" },
            "dutyRecurrences": { "dataType": "array", "array": { "ref": "DutyRecurrence" } },
        },
    },
    "Region": {
        "properties": {
            "id": { "dataType": "string" },
            "code": { "dataType": "string" },
            "name": { "dataType": "string", "required": true },
            "location": { "dataType": "any" },
        },
    },
    "Courthouse": {
        "properties": {
            "id": { "dataType": "string" },
            "code": { "dataType": "string", "required": true },
            "name": { "dataType": "string", "required": true },
            "parentCourthouseId": { "dataType": "string" },
            "regionId": { "dataType": "string", "required": true },
            "addressId": { "dataType": "string" },
            "location": { "dataType": "any" },
        },
    },
    "Sheriff": {
        "properties": {
            "id": { "dataType": "string" },
            "firstName": { "dataType": "string", "required": true },
            "lastName": { "dataType": "string", "required": true },
            "badgeNo": { "dataType": "string", "required": true },
            "imageUrl": { "dataType": "string" },
            "homeCourthouseId": { "dataType": "string", "required": true },
            "currentCourthouseId": { "dataType": "string" },
            "rankCode": { "dataType": "string", "required": true },
            "alias": { "dataType": "string" },
            "genderCode": { "dataType": "string" },
        },
    },
    "Courtroom": {
        "properties": {
            "id": { "dataType": "string" },
            "code": { "dataType": "string", "required": true },
            "name": { "dataType": "string", "required": true },
            "courthouseId": { "dataType": "string", "required": true },
        },
    },
    "JailRoleCode": {
        "properties": {
            "code": { "dataType": "string", "required": true },
            "description": { "dataType": "string", "required": true },
            "expiryDate": { "dataType": "string" },
        },
    },
    "OtherAssignCode": {
        "properties": {
            "code": { "dataType": "string", "required": true },
            "description": { "dataType": "string", "required": true },
            "expiryDate": { "dataType": "string" },
        },
    },
    "WorkSectionCode": {
        "properties": {
            "code": { "dataType": "string", "required": true },
            "description": { "dataType": "string", "required": true },
            "expiryDate": { "dataType": "string" },
        },
    },
    "SheriffRankCode": {
        "properties": {
            "code": { "dataType": "string", "required": true },
            "description": { "dataType": "string", "required": true },
            "expiryDate": { "dataType": "string" },
        },
    },
    "Run": {
        "properties": {
            "id": { "dataType": "string" },
            "title": { "dataType": "string", "required": true },
            "courthouseId": { "dataType": "string", "required": true },
        },
    },
    "Shift": {
        "properties": {
            "id": { "dataType": "string" },
            "workSectionId": { "dataType": "string" },
            "courthouseId": { "dataType": "string", "required": true },
            "sheriffId": { "dataType": "string" },
            "startDateTime": { "dataType": "string", "required": true },
            "endDateTime": { "dataType": "string", "required": true },
        },
    },
    "MultipleShiftUpdateRequest": {
        "properties": {
            "shiftIds": { "dataType": "array", "array": { "dataType": "string" }, "required": true },
            "sheriffId": { "dataType": "string" },
            "startTime": { "dataType": "string" },
            "endTime": { "dataType": "string" },
            "workSectionId": { "dataType": "string" },
        },
    },
    "ShiftCopyOptions": {
        "properties": {
            "shouldIncludeSheriffs": { "dataType": "boolean", "required": true },
            "startOfWeekSource": { "dataType": "string", "required": true },
            "startOfWeekDestination": { "dataType": "string", "required": true },
            "courthouseId": { "dataType": "string", "required": true },
        },
    },
    "SheriffDuty": {
        "properties": {
            "id": { "dataType": "string" },
            "sheriffId": { "dataType": "string" },
            "dutyId": { "dataType": "string" },
            "startDateTime": { "dataType": "string", "required": true },
            "endDateTime": { "dataType": "string", "required": true },
        },
    },
    "Duty": {
        "properties": {
            "id": { "dataType": "string" },
            "startDateTime": { "dataType": "string", "required": true },
            "endDateTime": { "dataType": "string", "required": true },
            "assignmentId": { "dataType": "string", "required": true },
            "dutyRecurrenceId": { "dataType": "string" },
            "sheriffDuties": { "dataType": "array", "array": { "ref": "SheriffDuty" } },
            "comments": { "dataType": "string" },
        },
    },
    "DutyImportDefaultsRequest": {
        "properties": {
            "courthouseId": { "dataType": "string", "required": true },
            "date": { "dataType": "string" },
        },
    },
    "Leave": {
        "properties": {
            "id": { "dataType": "string" },
            "sheriffId": { "dataType": "string", "required": true },
            "leaveCode": { "dataType": "string", "required": true },
            "leaveSubCode": { "dataType": "string", "required": true },
            "startDate": { "dataType": "string", "required": true },
            "endDate": { "dataType": "string" },
            "startTime": { "dataType": "string" },
            "endTime": { "dataType": "string" },
            "isPartial": { "dataType": "double", "required": true },
            "comment": { "dataType": "string" },
            "cancelDate": { "dataType": "string" },
            "cancelReasonCode": { "dataType": "string" },
        },
    },
    "LeaveCancelReasonCode": {
        "properties": {
            "code": { "dataType": "string", "required": true },
            "description": { "dataType": "string", "required": true },
            "expiryDate": { "dataType": "string" },
        },
    },
    "LeaveCode": {
        "properties": {
            "code": { "dataType": "string", "required": true },
            "description": { "dataType": "string", "required": true },
            "expiryDate": { "dataType": "string" },
        },
    },
    "LeaveSubCode": {
        "properties": {
            "code": { "dataType": "string", "required": true },
            "subCode": { "dataType": "string", "required": true },
            "description": { "dataType": "string", "required": true },
            "expiryDate": { "dataType": "string" },
        },
    },
    "CourtRoleCode": {
        "properties": {
            "code": { "dataType": "string", "required": true },
            "description": { "dataType": "string", "required": true },
            "expiryDate": { "dataType": "string" },
        },
    },
    "GenderCode": {
        "properties": {
            "code": { "dataType": "string", "required": true },
            "description": { "dataType": "string", "required": true },
            "expiryDate": { "dataType": "string" },
        },
    },
};

export function RegisterRoutes(router: any) {
    router.get('/v1/Assignments',
        authenticateMiddleware([{ "name": "jwt", "scopes": ["default"] }]),
        async (context, next) => {
            const args = {
                courthouseId: { "in": "query", "name": "courthouseId", "dataType": "string" },
                startDate: { "in": "query", "name": "startDate", "dataType": "string" },
                endDate: { "in": "query", "name": "endDate", "dataType": "string" },
            };

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, context);
            } catch (error) {
                context.status = error.status || 500;
                context.body = error;
                return next();
            }

            const controller = new AssignmentController();

            const promise = controller.getAssignments.apply(controller, validatedArgs);
            return promiseHandler(controller, promise, context, next);
        });
    router.get('/v1/Assignments/:id',
        authenticateMiddleware([{ "name": "jwt", "scopes": ["default"] }]),
        async (context, next) => {
            const args = {
                id: { "in": "path", "name": "id", "required": true, "dataType": "string" },
            };

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, context);
            } catch (error) {
                context.status = error.status || 500;
                context.body = error;
                return next();
            }

            const controller = new AssignmentController();

            const promise = controller.getAssignmentById.apply(controller, validatedArgs);
            return promiseHandler(controller, promise, context, next);
        });
    router.post('/v1/Assignments',
        authenticateMiddleware([{ "name": "jwt", "scopes": ["default"] }]),
        async (context, next) => {
            const args = {
                model: { "in": "body", "name": "model", "required": true, "ref": "Assignment" },
            };

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, context);
            } catch (error) {
                context.status = error.status || 500;
                context.body = error;
                return next();
            }

            const controller = new AssignmentController();

            const promise = controller.createAssignment.apply(controller, validatedArgs);
            return promiseHandler(controller, promise, context, next);
        });
    router.put('/v1/Assignments/:id',
        authenticateMiddleware([{ "name": "jwt", "scopes": ["default"] }]),
        async (context, next) => {
            const args = {
                id: { "in": "path", "name": "id", "required": true, "dataType": "string" },
                model: { "in": "body", "name": "model", "required": true, "ref": "Assignment" },
            };

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, context);
            } catch (error) {
                context.status = error.status || 500;
                context.body = error;
                return next();
            }

            const controller = new AssignmentController();

            const promise = controller.updateAssignment.apply(controller, validatedArgs);
            return promiseHandler(controller, promise, context, next);
        });
    router.post('/v1/Assignments/:id',
        authenticateMiddleware([{ "name": "jwt", "scopes": ["default"] }]),
        async (context, next) => {
            const args = {
                id: { "in": "path", "name": "id", "required": true, "dataType": "string" },
            };

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, context);
            } catch (error) {
                context.status = error.status || 500;
                context.body = error;
                return next();
            }

            const controller = new AssignmentController();

            const promise = controller.expireAssignment.apply(controller, validatedArgs);
            return promiseHandler(controller, promise, context, next);
        });
    router.delete('/v1/Assignments/:id',
        authenticateMiddleware([{ "name": "jwt", "scopes": ["default"] }]),
        async (context, next) => {
            const args = {
                id: { "in": "path", "name": "id", "required": true, "dataType": "string" },
            };

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, context);
            } catch (error) {
                context.status = error.status || 500;
                context.body = error;
                return next();
            }

            const controller = new AssignmentController();

            const promise = controller.deleteAssignment.apply(controller, validatedArgs);
            return promiseHandler(controller, promise, context, next);
        });
    router.get('/v1/regions',
        authenticateMiddleware([{ "name": "jwt" }]),
        async (context, next) => {
            const args = {
            };

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, context);
            } catch (error) {
                context.status = error.status || 500;
                context.body = error;
                return next();
            }

            const controller = new RegionController();

            const promise = controller.getRegions.apply(controller, validatedArgs);
            return promiseHandler(controller, promise, context, next);
        });
    router.get('/v1/regions/:id',
        authenticateMiddleware([{ "name": "jwt" }]),
        async (context, next) => {
            const args = {
                id: { "in": "path", "name": "id", "required": true, "dataType": "string" },
            };

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, context);
            } catch (error) {
                context.status = error.status || 500;
                context.body = error;
                return next();
            }

            const controller = new RegionController();

            const promise = controller.getRegionById.apply(controller, validatedArgs);
            return promiseHandler(controller, promise, context, next);
        });
    router.post('/v1/regions',
        authenticateMiddleware([{ "name": "jwt" }]),
        async (context, next) => {
            const args = {
                model: { "in": "body", "name": "model", "required": true, "ref": "Region" },
            };

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, context);
            } catch (error) {
                context.status = error.status || 500;
                context.body = error;
                return next();
            }

            const controller = new RegionController();

            const promise = controller.createRegion.apply(controller, validatedArgs);
            return promiseHandler(controller, promise, context, next);
        });
    router.put('/v1/regions/:id',
        authenticateMiddleware([{ "name": "jwt" }]),
        async (context, next) => {
            const args = {
                id: { "in": "path", "name": "id", "required": true, "dataType": "string" },
                model: { "in": "body", "name": "model", "required": true, "ref": "Region" },
            };

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, context);
            } catch (error) {
                context.status = error.status || 500;
                context.body = error;
                return next();
            }

            const controller = new RegionController();

            const promise = controller.updateRegion.apply(controller, validatedArgs);
            return promiseHandler(controller, promise, context, next);
        });
    router.delete('/v1/regions/:id',
        authenticateMiddleware([{ "name": "jwt" }]),
        async (context, next) => {
            const args = {
                id: { "in": "path", "name": "id", "required": true, "dataType": "string" },
            };

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, context);
            } catch (error) {
                context.status = error.status || 500;
                context.body = error;
                return next();
            }

            const controller = new RegionController();

            const promise = controller.deleteRegion.apply(controller, validatedArgs);
            return promiseHandler(controller, promise, context, next);
        });
    router.get('/v1/courthouses',
        authenticateMiddleware([{ "name": "jwt" }]),
        async (context, next) => {
            const args = {
            };

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, context);
            } catch (error) {
                context.status = error.status || 500;
                context.body = error;
                return next();
            }

            const controller = new CourthouseController();

            const promise = controller.getCourthouses.apply(controller, validatedArgs);
            return promiseHandler(controller, promise, context, next);
        });
    router.get('/v1/courthouses/:id',
        authenticateMiddleware([{ "name": "jwt" }]),
        async (context, next) => {
            const args = {
                id: { "in": "path", "name": "id", "required": true, "dataType": "string" },
            };

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, context);
            } catch (error) {
                context.status = error.status || 500;
                context.body = error;
                return next();
            }

            const controller = new CourthouseController();

            const promise = controller.getCourthouseById.apply(controller, validatedArgs);
            return promiseHandler(controller, promise, context, next);
        });
    router.post('/v1/courthouses',
        authenticateMiddleware([{ "name": "jwt" }]),
        async (context, next) => {
            const args = {
                model: { "in": "body", "name": "model", "required": true, "ref": "Courthouse" },
            };

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, context);
            } catch (error) {
                context.status = error.status || 500;
                context.body = error;
                return next();
            }

            const controller = new CourthouseController();

            const promise = controller.createCourthouse.apply(controller, validatedArgs);
            return promiseHandler(controller, promise, context, next);
        });
    router.put('/v1/courthouses/:id',
        authenticateMiddleware([{ "name": "jwt" }]),
        async (context, next) => {
            const args = {
                id: { "in": "path", "name": "id", "required": true, "dataType": "string" },
                model: { "in": "body", "name": "model", "required": true, "ref": "Courthouse" },
            };

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, context);
            } catch (error) {
                context.status = error.status || 500;
                context.body = error;
                return next();
            }

            const controller = new CourthouseController();

            const promise = controller.updateCourthouse.apply(controller, validatedArgs);
            return promiseHandler(controller, promise, context, next);
        });
    router.delete('/v1/courthouses/:id',
        authenticateMiddleware([{ "name": "jwt" }]),
        async (context, next) => {
            const args = {
                id: { "in": "path", "name": "id", "required": true, "dataType": "string" },
            };

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, context);
            } catch (error) {
                context.status = error.status || 500;
                context.body = error;
                return next();
            }

            const controller = new CourthouseController();

            const promise = controller.deleteCourthouse.apply(controller, validatedArgs);
            return promiseHandler(controller, promise, context, next);
        });
    router.get('/v1/sheriffs',
        authenticateMiddleware([{ "name": "jwt" }]),
        async (context, next) => {
            const args = {
                courthouseId: { "in": "query", "name": "courthouseId", "dataType": "string" },
            };

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, context);
            } catch (error) {
                context.status = error.status || 500;
                context.body = error;
                return next();
            }

            const controller = new SheriffController();

            const promise = controller.getSheriffs.apply(controller, validatedArgs);
            return promiseHandler(controller, promise, context, next);
        });
    router.get('/v1/sheriffs/:id',
        authenticateMiddleware([{ "name": "jwt" }]),
        async (context, next) => {
            const args = {
                id: { "in": "path", "name": "id", "required": true, "dataType": "string" },
            };

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, context);
            } catch (error) {
                context.status = error.status || 500;
                context.body = error;
                return next();
            }

            const controller = new SheriffController();

            const promise = controller.getSheriffById.apply(controller, validatedArgs);
            return promiseHandler(controller, promise, context, next);
        });
    router.post('/v1/sheriffs',
        authenticateMiddleware([{ "name": "jwt" }]),
        async (context, next) => {
            const args = {
                model: { "in": "body", "name": "model", "required": true, "ref": "Sheriff" },
            };

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, context);
            } catch (error) {
                context.status = error.status || 500;
                context.body = error;
                return next();
            }

            const controller = new SheriffController();

            const promise = controller.createSheriff.apply(controller, validatedArgs);
            return promiseHandler(controller, promise, context, next);
        });
    router.put('/v1/sheriffs/:id',
        authenticateMiddleware([{ "name": "jwt" }]),
        async (context, next) => {
            const args = {
                id: { "in": "path", "name": "id", "required": true, "dataType": "string" },
                model: { "in": "body", "name": "model", "required": true, "ref": "Sheriff" },
            };

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, context);
            } catch (error) {
                context.status = error.status || 500;
                context.body = error;
                return next();
            }

            const controller = new SheriffController();

            const promise = controller.updateSheriff.apply(controller, validatedArgs);
            return promiseHandler(controller, promise, context, next);
        });
    router.delete('/v1/sheriffs/:id',
        authenticateMiddleware([{ "name": "jwt" }]),
        async (context, next) => {
            const args = {
                id: { "in": "path", "name": "id", "required": true, "dataType": "string" },
            };

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, context);
            } catch (error) {
                context.status = error.status || 500;
                context.body = error;
                return next();
            }

            const controller = new SheriffController();

            const promise = controller.deleteSheriff.apply(controller, validatedArgs);
            return promiseHandler(controller, promise, context, next);
        });
    router.get('/v1/courtrooms',
        authenticateMiddleware([{ "name": "jwt" }]),
        async (context, next) => {
            const args = {
                courthouseId: { "in": "query", "name": "courthouseId", "dataType": "string" },
            };

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, context);
            } catch (error) {
                context.status = error.status || 500;
                context.body = error;
                return next();
            }

            const controller = new CourtroomController();

            const promise = controller.getCourtrooms.apply(controller, validatedArgs);
            return promiseHandler(controller, promise, context, next);
        });
    router.get('/v1/courtrooms/:id',
        authenticateMiddleware([{ "name": "jwt" }]),
        async (context, next) => {
            const args = {
                id: { "in": "path", "name": "id", "required": true, "dataType": "string" },
            };

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, context);
            } catch (error) {
                context.status = error.status || 500;
                context.body = error;
                return next();
            }

            const controller = new CourtroomController();

            const promise = controller.getCourtroomById.apply(controller, validatedArgs);
            return promiseHandler(controller, promise, context, next);
        });
    router.post('/v1/courtrooms',
        authenticateMiddleware([{ "name": "jwt" }]),
        async (context, next) => {
            const args = {
                model: { "in": "body", "name": "model", "required": true, "ref": "Courtroom" },
            };

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, context);
            } catch (error) {
                context.status = error.status || 500;
                context.body = error;
                return next();
            }

            const controller = new CourtroomController();

            const promise = controller.createCourtroom.apply(controller, validatedArgs);
            return promiseHandler(controller, promise, context, next);
        });
    router.put('/v1/courtrooms/:id',
        authenticateMiddleware([{ "name": "jwt" }]),
        async (context, next) => {
            const args = {
                id: { "in": "path", "name": "id", "required": true, "dataType": "string" },
                model: { "in": "body", "name": "model", "required": true, "ref": "Courtroom" },
            };

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, context);
            } catch (error) {
                context.status = error.status || 500;
                context.body = error;
                return next();
            }

            const controller = new CourtroomController();

            const promise = controller.updateCourtroom.apply(controller, validatedArgs);
            return promiseHandler(controller, promise, context, next);
        });
    router.delete('/v1/courtrooms/:id',
        authenticateMiddleware([{ "name": "jwt" }]),
        async (context, next) => {
            const args = {
                id: { "in": "path", "name": "id", "required": true, "dataType": "string" },
            };

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, context);
            } catch (error) {
                context.status = error.status || 500;
                context.body = error;
                return next();
            }

            const controller = new CourtroomController();

            const promise = controller.deleteCourtroom.apply(controller, validatedArgs);
            return promiseHandler(controller, promise, context, next);
        });
    router.get('/v1/codes/jailroles',
        authenticateMiddleware([{ "name": "jwt" }]),
        async (context, next) => {
            const args = {
            };

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, context);
            } catch (error) {
                context.status = error.status || 500;
                context.body = error;
                return next();
            }

            const controller = new JailRoleCodesController();

            const promise = controller.getJailRoleCodes.apply(controller, validatedArgs);
            return promiseHandler(controller, promise, context, next);
        });
    router.get('/v1/codes/otherassign',
        authenticateMiddleware([{ "name": "jwt" }]),
        async (context, next) => {
            const args = {
            };

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, context);
            } catch (error) {
                context.status = error.status || 500;
                context.body = error;
                return next();
            }

            const controller = new OtherAssignCodesController();

            const promise = controller.getOtherAssignCodes.apply(controller, validatedArgs);
            return promiseHandler(controller, promise, context, next);
        });
    router.get('/v1/codes/worksection',
        authenticateMiddleware([{ "name": "jwt" }]),
        async (context, next) => {
            const args = {
            };

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, context);
            } catch (error) {
                context.status = error.status || 500;
                context.body = error;
                return next();
            }

            const controller = new WorkSectionCodesController();

            const promise = controller.getWorkSectionCodes.apply(controller, validatedArgs);
            return promiseHandler(controller, promise, context, next);
        });
    router.get('/v1/codes/sheriffrank',
        authenticateMiddleware([{ "name": "jwt" }]),
        async (context, next) => {
            const args = {
            };

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, context);
            } catch (error) {
                context.status = error.status || 500;
                context.body = error;
                return next();
            }

            const controller = new SheriffRankCodesController();

            const promise = controller.getSheriffRankCodes.apply(controller, validatedArgs);
            return promiseHandler(controller, promise, context, next);
        });
    router.get('/v1/runs',
        authenticateMiddleware([{ "name": "jwt" }]),
        async (context, next) => {
            const args = {
                courthouseId: { "in": "query", "name": "courthouseId", "dataType": "string" },
            };

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, context);
            } catch (error) {
                context.status = error.status || 500;
                context.body = error;
                return next();
            }

            const controller = new RunController();

            const promise = controller.getRuns.apply(controller, validatedArgs);
            return promiseHandler(controller, promise, context, next);
        });
    router.get('/v1/runs/:id',
        authenticateMiddleware([{ "name": "jwt" }]),
        async (context, next) => {
            const args = {
                id: { "in": "path", "name": "id", "required": true, "dataType": "string" },
            };

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, context);
            } catch (error) {
                context.status = error.status || 500;
                context.body = error;
                return next();
            }

            const controller = new RunController();

            const promise = controller.getRunById.apply(controller, validatedArgs);
            return promiseHandler(controller, promise, context, next);
        });
    router.post('/v1/runs',
        authenticateMiddleware([{ "name": "jwt" }]),
        async (context, next) => {
            const args = {
                model: { "in": "body", "name": "model", "required": true, "ref": "Run" },
            };

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, context);
            } catch (error) {
                context.status = error.status || 500;
                context.body = error;
                return next();
            }

            const controller = new RunController();

            const promise = controller.createRun.apply(controller, validatedArgs);
            return promiseHandler(controller, promise, context, next);
        });
    router.put('/v1/runs/:id',
        authenticateMiddleware([{ "name": "jwt" }]),
        async (context, next) => {
            const args = {
                id: { "in": "path", "name": "id", "required": true, "dataType": "string" },
                model: { "in": "body", "name": "model", "required": true, "ref": "Run" },
            };

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, context);
            } catch (error) {
                context.status = error.status || 500;
                context.body = error;
                return next();
            }

            const controller = new RunController();

            const promise = controller.updateRun.apply(controller, validatedArgs);
            return promiseHandler(controller, promise, context, next);
        });
    router.delete('/v1/runs/:id',
        authenticateMiddleware([{ "name": "jwt" }]),
        async (context, next) => {
            const args = {
                id: { "in": "path", "name": "id", "required": true, "dataType": "string" },
            };

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, context);
            } catch (error) {
                context.status = error.status || 500;
                context.body = error;
                return next();
            }

            const controller = new RunController();

            const promise = controller.deleteRun.apply(controller, validatedArgs);
            return promiseHandler(controller, promise, context, next);
        });
    router.get('/v1/Shifts',
        async (context, next) => {
            const args = {
                courthouseId: { "in": "query", "name": "courthouseId", "dataType": "string" },
            };

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, context);
            } catch (error) {
                context.status = error.status || 500;
                context.body = error;
                return next();
            }

            const controller = new ShiftController();

            const promise = controller.getShifts.apply(controller, validatedArgs);
            return promiseHandler(controller, promise, context, next);
        });
    router.get('/v1/Shifts/:id',
        async (context, next) => {
            const args = {
                id: { "in": "path", "name": "id", "required": true, "dataType": "string" },
            };

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, context);
            } catch (error) {
                context.status = error.status || 500;
                context.body = error;
                return next();
            }

            const controller = new ShiftController();

            const promise = controller.getShiftById.apply(controller, validatedArgs);
            return promiseHandler(controller, promise, context, next);
        });
    router.post('/v1/Shifts',
        async (context, next) => {
            const args = {
                model: { "in": "body", "name": "model", "required": true, "ref": "Shift" },
            };

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, context);
            } catch (error) {
                context.status = error.status || 500;
                context.body = error;
                return next();
            }

            const controller = new ShiftController();

            const promise = controller.createShift.apply(controller, validatedArgs);
            return promiseHandler(controller, promise, context, next);
        });
    router.put('/v1/Shifts/:id',
        async (context, next) => {
            const args = {
                id: { "in": "path", "name": "id", "required": true, "dataType": "string" },
                model: { "in": "body", "name": "model", "required": true, "ref": "Shift" },
            };

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, context);
            } catch (error) {
                context.status = error.status || 500;
                context.body = error;
                return next();
            }

            const controller = new ShiftController();

            const promise = controller.updateShift.apply(controller, validatedArgs);
            return promiseHandler(controller, promise, context, next);
        });
    router.delete('/v1/Shifts/:id',
        async (context, next) => {
            const args = {
                id: { "in": "path", "name": "id", "required": true, "dataType": "string" },
            };

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, context);
            } catch (error) {
                context.status = error.status || 500;
                context.body = error;
                return next();
            }

            const controller = new ShiftController();

            const promise = controller.deleteShift.apply(controller, validatedArgs);
            return promiseHandler(controller, promise, context, next);
        });
    router.post('/v1/Shifts/multiple',
        async (context, next) => {
            const args = {
                model: { "in": "body", "name": "model", "required": true, "ref": "MultipleShiftUpdateRequest" },
            };

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, context);
            } catch (error) {
                context.status = error.status || 500;
                context.body = error;
                return next();
            }

            const controller = new ShiftController();

            const promise = controller.updateMultipleShifts.apply(controller, validatedArgs);
            return promiseHandler(controller, promise, context, next);
        });
    router.post('/v1/Shifts/copy',
        async (context, next) => {
            const args = {
                model: { "in": "body", "name": "model", "required": true, "ref": "ShiftCopyOptions" },
            };

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, context);
            } catch (error) {
                context.status = error.status || 500;
                context.body = error;
                return next();
            }

            const controller = new ShiftController();

            const promise = controller.copyShifts.apply(controller, validatedArgs);
            return promiseHandler(controller, promise, context, next);
        });
    router.get('/v1/DutyRecurrences',
        authenticateMiddleware([{ "name": "jwt" }]),
        async (context, next) => {
            const args = {
                startDate: { "in": "query", "name": "startDate", "dataType": "string" },
                endDate: { "in": "query", "name": "endDate", "dataType": "string" },
            };

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, context);
            } catch (error) {
                context.status = error.status || 500;
                context.body = error;
                return next();
            }

            const controller = new DutyRecurrenceController();

            const promise = controller.getDutyRecurrences.apply(controller, validatedArgs);
            return promiseHandler(controller, promise, context, next);
        });
    router.get('/v1/DutyRecurrences/:id',
        authenticateMiddleware([{ "name": "jwt" }]),
        async (context, next) => {
            const args = {
                id: { "in": "path", "name": "id", "required": true, "dataType": "string" },
            };

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, context);
            } catch (error) {
                context.status = error.status || 500;
                context.body = error;
                return next();
            }

            const controller = new DutyRecurrenceController();

            const promise = controller.getDutyRecurrenceById.apply(controller, validatedArgs);
            return promiseHandler(controller, promise, context, next);
        });
    router.post('/v1/DutyRecurrences',
        authenticateMiddleware([{ "name": "jwt" }]),
        async (context, next) => {
            const args = {
                model: { "in": "body", "name": "model", "required": true, "ref": "DutyRecurrence" },
            };

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, context);
            } catch (error) {
                context.status = error.status || 500;
                context.body = error;
                return next();
            }

            const controller = new DutyRecurrenceController();

            const promise = controller.createDutyRecurrence.apply(controller, validatedArgs);
            return promiseHandler(controller, promise, context, next);
        });
    router.put('/v1/DutyRecurrences/:id',
        authenticateMiddleware([{ "name": "jwt" }]),
        async (context, next) => {
            const args = {
                id: { "in": "path", "name": "id", "required": true, "dataType": "string" },
                model: { "in": "body", "name": "model", "required": true, "ref": "DutyRecurrence" },
            };

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, context);
            } catch (error) {
                context.status = error.status || 500;
                context.body = error;
                return next();
            }

            const controller = new DutyRecurrenceController();

            const promise = controller.updateDutyRecurrence.apply(controller, validatedArgs);
            return promiseHandler(controller, promise, context, next);
        });
    router.post('/v1/DutyRecurrences/:id',
        authenticateMiddleware([{ "name": "jwt" }]),
        async (context, next) => {
            const args = {
                id: { "in": "path", "name": "id", "required": true, "dataType": "string" },
            };

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, context);
            } catch (error) {
                context.status = error.status || 500;
                context.body = error;
                return next();
            }

            const controller = new DutyRecurrenceController();

            const promise = controller.expireDutyRecurrence.apply(controller, validatedArgs);
            return promiseHandler(controller, promise, context, next);
        });
    router.delete('/v1/DutyRecurrences/:id',
        authenticateMiddleware([{ "name": "jwt" }]),
        async (context, next) => {
            const args = {
                id: { "in": "path", "name": "id", "required": true, "dataType": "string" },
            };

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, context);
            } catch (error) {
                context.status = error.status || 500;
                context.body = error;
                return next();
            }

            const controller = new DutyRecurrenceController();

            const promise = controller.deleteDutyRecurrence.apply(controller, validatedArgs);
            return promiseHandler(controller, promise, context, next);
        });
    router.get('/v1/Duty',
        authenticateMiddleware([{ "name": "jwt" }]),
        async (context, next) => {
            const args = {
            };

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, context);
            } catch (error) {
                context.status = error.status || 500;
                context.body = error;
                return next();
            }

            const controller = new DutyController();

            const promise = controller.getDuties.apply(controller, validatedArgs);
            return promiseHandler(controller, promise, context, next);
        });
    router.get('/v1/Duty/:id',
        authenticateMiddleware([{ "name": "jwt" }]),
        async (context, next) => {
            const args = {
                id: { "in": "path", "name": "id", "required": true, "dataType": "string" },
            };

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, context);
            } catch (error) {
                context.status = error.status || 500;
                context.body = error;
                return next();
            }

            const controller = new DutyController();

            const promise = controller.getDutyById.apply(controller, validatedArgs);
            return promiseHandler(controller, promise, context, next);
        });
    router.post('/v1/Duty',
        authenticateMiddleware([{ "name": "jwt" }]),
        async (context, next) => {
            const args = {
                model: { "in": "body", "name": "model", "required": true, "ref": "Duty" },
            };

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, context);
            } catch (error) {
                context.status = error.status || 500;
                context.body = error;
                return next();
            }

            const controller = new DutyController();

            const promise = controller.createDuty.apply(controller, validatedArgs);
            return promiseHandler(controller, promise, context, next);
        });
    router.put('/v1/Duty/:id',
        authenticateMiddleware([{ "name": "jwt" }]),
        async (context, next) => {
            const args = {
                id: { "in": "path", "name": "id", "required": true, "dataType": "string" },
                model: { "in": "body", "name": "model", "required": true, "ref": "Duty" },
            };

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, context);
            } catch (error) {
                context.status = error.status || 500;
                context.body = error;
                return next();
            }

            const controller = new DutyController();

            const promise = controller.updateDuty.apply(controller, validatedArgs);
            return promiseHandler(controller, promise, context, next);
        });
    router.delete('/v1/Duty/:id',
        authenticateMiddleware([{ "name": "jwt" }]),
        async (context, next) => {
            const args = {
                id: { "in": "path", "name": "id", "required": true, "dataType": "string" },
            };

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, context);
            } catch (error) {
                context.status = error.status || 500;
                context.body = error;
                return next();
            }

            const controller = new DutyController();

            const promise = controller.deleteDuty.apply(controller, validatedArgs);
            return promiseHandler(controller, promise, context, next);
        });
    router.post('/v1/Duty/import',
        authenticateMiddleware([{ "name": "jwt" }]),
        async (context, next) => {
            const args = {
                body: { "in": "body", "name": "body", "required": true, "ref": "DutyImportDefaultsRequest" },
            };

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, context);
            } catch (error) {
                context.status = error.status || 500;
                context.body = error;
                return next();
            }

            const controller = new DutyController();

            const promise = controller.importDefaultDuties.apply(controller, validatedArgs);
            return promiseHandler(controller, promise, context, next);
        });
    router.get('/v1/SheriffDuty',
        async (context, next) => {
            const args = {
            };

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, context);
            } catch (error) {
                context.status = error.status || 500;
                context.body = error;
                return next();
            }

            const controller = new SheriffDutyController();

            const promise = controller.getSheriffDuties.apply(controller, validatedArgs);
            return promiseHandler(controller, promise, context, next);
        });
    router.get('/v1/SheriffDuty/:id',
        async (context, next) => {
            const args = {
                id: { "in": "path", "name": "id", "required": true, "dataType": "string" },
            };

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, context);
            } catch (error) {
                context.status = error.status || 500;
                context.body = error;
                return next();
            }

            const controller = new SheriffDutyController();

            const promise = controller.getSheriffDutyById.apply(controller, validatedArgs);
            return promiseHandler(controller, promise, context, next);
        });
    router.post('/v1/SheriffDuty',
        async (context, next) => {
            const args = {
                model: { "in": "body", "name": "model", "required": true, "ref": "SheriffDuty" },
            };

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, context);
            } catch (error) {
                context.status = error.status || 500;
                context.body = error;
                return next();
            }

            const controller = new SheriffDutyController();

            const promise = controller.createSheriffDuty.apply(controller, validatedArgs);
            return promiseHandler(controller, promise, context, next);
        });
    router.put('/v1/SheriffDuty/:id',
        async (context, next) => {
            const args = {
                id: { "in": "path", "name": "id", "required": true, "dataType": "string" },
                model: { "in": "body", "name": "model", "required": true, "ref": "SheriffDuty" },
            };

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, context);
            } catch (error) {
                context.status = error.status || 500;
                context.body = error;
                return next();
            }

            const controller = new SheriffDutyController();

            const promise = controller.updateSheriffDuty.apply(controller, validatedArgs);
            return promiseHandler(controller, promise, context, next);
        });
    router.delete('/v1/SheriffDuty/:id',
        async (context, next) => {
            const args = {
                id: { "in": "path", "name": "id", "required": true, "dataType": "string" },
            };

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, context);
            } catch (error) {
                context.status = error.status || 500;
                context.body = error;
                return next();
            }

            const controller = new SheriffDutyController();

            const promise = controller.deleteSheriffDuty.apply(controller, validatedArgs);
            return promiseHandler(controller, promise, context, next);
        });
    router.get('/v1/leaves',
        authenticateMiddleware([{ "name": "jwt" }]),
        async (context, next) => {
            const args = {
            };

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, context);
            } catch (error) {
                context.status = error.status || 500;
                context.body = error;
                return next();
            }

            const controller = new LeaveController();

            const promise = controller.getLeaves.apply(controller, validatedArgs);
            return promiseHandler(controller, promise, context, next);
        });
    router.get('/v1/leaves/:id',
        authenticateMiddleware([{ "name": "jwt" }]),
        async (context, next) => {
            const args = {
                id: { "in": "path", "name": "id", "required": true, "dataType": "string" },
            };

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, context);
            } catch (error) {
                context.status = error.status || 500;
                context.body = error;
                return next();
            }

            const controller = new LeaveController();

            const promise = controller.getLeaveById.apply(controller, validatedArgs);
            return promiseHandler(controller, promise, context, next);
        });
    router.post('/v1/leaves',
        authenticateMiddleware([{ "name": "jwt" }]),
        async (context, next) => {
            const args = {
                model: { "in": "body", "name": "model", "required": true, "ref": "Leave" },
            };

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, context);
            } catch (error) {
                context.status = error.status || 500;
                context.body = error;
                return next();
            }

            const controller = new LeaveController();

            const promise = controller.createLeave.apply(controller, validatedArgs);
            return promiseHandler(controller, promise, context, next);
        });
    router.put('/v1/leaves/:id',
        authenticateMiddleware([{ "name": "jwt" }]),
        async (context, next) => {
            const args = {
                id: { "in": "path", "name": "id", "required": true, "dataType": "string" },
                model: { "in": "body", "name": "model", "required": true, "ref": "Leave" },
            };

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, context);
            } catch (error) {
                context.status = error.status || 500;
                context.body = error;
                return next();
            }

            const controller = new LeaveController();

            const promise = controller.updateLeave.apply(controller, validatedArgs);
            return promiseHandler(controller, promise, context, next);
        });
    router.delete('/v1/leaves/:id',
        authenticateMiddleware([{ "name": "jwt" }]),
        async (context, next) => {
            const args = {
                id: { "in": "path", "name": "id", "required": true, "dataType": "string" },
            };

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, context);
            } catch (error) {
                context.status = error.status || 500;
                context.body = error;
                return next();
            }

            const controller = new LeaveController();

            const promise = controller.deleteLeave.apply(controller, validatedArgs);
            return promiseHandler(controller, promise, context, next);
        });
    router.get('/v1/codes/leave-cancel',
        authenticateMiddleware([{ "name": "jwt" }]),
        async (context, next) => {
            const args = {
            };

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, context);
            } catch (error) {
                context.status = error.status || 500;
                context.body = error;
                return next();
            }

            const controller = new LeaveCancelCodesController();

            const promise = controller.getLeaveCancelReasonCodes.apply(controller, validatedArgs);
            return promiseHandler(controller, promise, context, next);
        });
    router.get('/v1/codes/leave-type',
        authenticateMiddleware([{ "name": "jwt" }]),
        async (context, next) => {
            const args = {
            };

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, context);
            } catch (error) {
                context.status = error.status || 500;
                context.body = error;
                return next();
            }

            const controller = new LeaveTypeCodesController();

            const promise = controller.getLeaveTypes.apply(controller, validatedArgs);
            return promiseHandler(controller, promise, context, next);
        });
    router.get('/v1/codes/leave-sub-type',
        authenticateMiddleware([{ "name": "jwt" }]),
        async (context, next) => {
            const args = {
            };

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, context);
            } catch (error) {
                context.status = error.status || 500;
                context.body = error;
                return next();
            }

            const controller = new LeaveSubTypeCodesController();

            const promise = controller.getLeaveSubCodes.apply(controller, validatedArgs);
            return promiseHandler(controller, promise, context, next);
        });
    router.get('/v1/codes/courtroles',
        authenticateMiddleware([{ "name": "jwt" }]),
        async (context, next) => {
            const args = {
            };

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, context);
            } catch (error) {
                context.status = error.status || 500;
                context.body = error;
                return next();
            }

            const controller = new CourtRoleCodesController();

            const promise = controller.getCourtRoleCodes.apply(controller, validatedArgs);
            return promiseHandler(controller, promise, context, next);
        });
    router.get('/v1/codes/gender',
        authenticateMiddleware([{ "name": "jwt" }]),
        async (context, next) => {
            const args = {
            };

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, context);
            } catch (error) {
                context.status = error.status || 500;
                context.body = error;
                return next();
            }

            const controller = new GenderCodesController();

            const promise = controller.getGenderCodes.apply(controller, validatedArgs);
            return promiseHandler(controller, promise, context, next);
        });
    router.get('/v1/token',
        authenticateMiddleware([{ "name": "siteminder" }]),
        async (context, next) => {
            const args = {
                request: { "in": "request", "name": "request", "required": true, "dataType": "object" },
            };

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, context);
            } catch (error) {
                context.status = error.status || 500;
                context.body = error;
                return next();
            }

            const controller = new TokenController();

            const promise = controller.getToken.apply(controller, validatedArgs);
            return promiseHandler(controller, promise, context, next);
        });

    function authenticateMiddleware(security: TsoaRoute.Security[] = []) {
        return async (context: any, next: any) => {
            let responded = 0;
            let success = false;
            for (const secMethod of security) {
                try {
                    const user = await koaAuthentication(context.request, secMethod.name, secMethod.scopes)
                    // only need to respond once
                    if (!success) {
                        success = true;
                        responded++;
                        context.request['user'] = user;
                        return next();
                    }
                } catch (error) {
                    responded++;
                    // If no authentication was successful
                    if (responded == security.length && !success) {
                        context.throw(401, 'access_denied', `${error.message ? error.message : error}`);
                    }
                }
            }
        }
    }

    function isController(object: any): object is Controller {
        return 'getHeaders' in object && 'getStatus' in object && 'setStatus' in object;
    }

    function promiseHandler(controllerObj: any, promise: Promise<any>, context: any, next: () => Promise<any>) {
        return Promise.resolve(promise)
            .then((data: any) => {
                if (data || data === false) {
                    context.body = data;
                    context.status = 200;
                } else {
                    context.status = 204;
                }

                if (isController(controllerObj)) {
                    const headers = controllerObj.getHeaders();
                    Object.keys(headers).forEach((name: string) => {
                        context.set(name, headers[name]);
                    });

                    const statusCode = controllerObj.getStatus();
                    if (statusCode) {
                        context.status = statusCode;
                    }
                }
                return next();
            })
            .catch((error: any) => {
                context.status = error.status || 500;
                context.body = error;
                return next();
            });
    }

    function getValidatedArgs(args: any, context: any): any[] {
        const errorFields: FieldErrors = {};
        const values = Object.keys(args).map(key => {
            const name = args[key].name;
            switch (args[key].in) {
                case 'request':
                    return context.request;
                case 'query':
                    return ValidateParam(args[key], context.request.query[name], models, name, errorFields)
                case 'path':
                    return ValidateParam(args[key], context.params[name], models, name, errorFields)
                case 'header':
                    return ValidateParam(args[key], context.request.headers[name], models, name, errorFields);
                case 'body':
                    return ValidateParam(args[key], context.request.body, models, name, errorFields, name + '.');
                case 'body-prop':
                    return ValidateParam(args[key], context.request.body[name], models, name, errorFields, 'body.');
            }
        });
        if (Object.keys(errorFields).length > 0) {
            throw new ValidateError(errorFields, '');
        }
        return values;
    }
}
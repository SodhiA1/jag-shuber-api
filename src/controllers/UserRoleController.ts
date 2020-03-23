        import { Body, Delete, Get, Path, Post, Put, Query, Route } from 'tsoa';
import ControllerBase from '../infrastructure/ControllerBase';
import { Security } from '../authentication';
import { Inject, AutoWired } from 'typescript-ioc';
import { UserRoleService } from '../services/UserRoleService';
import { UserRole } from '../models/UserRole';

@Route('UserRole')
@Security('jwt')
@AutoWired
export class UserRoleController extends ControllerBase<any, UserRoleService> {
    @Inject
    protected serviceInstance!: UserRoleService;

    @Security('jwt', ['roles:read'])
    @Get('me')
    public getCurrentUserRoles(){
        return super.getAll();
    }

    @Security('jwt', ['roles:read'])
    @Get()
    public getUserRoles(@Query() locationId?: string, @Query() startDate?: string, @Query() endDate?: string) {
        return this.service.getAll(undefined, { startDate, endDate });
    }

    @Security('jwt', ['roles:read'])
    @Get('{id}')
    public getUserRoleById(id: string) {
        return super.getById(id);
    }

    @Security('jwt', ['roles:manage'])
    @Post()
    public createUserRole(@Body() model: UserRole) {
        return super.create(model);
    }

    @Security('jwt', ['roles:manage'])
    @Post('{id}/expire')
    public expireUserRole(@Path() id:string) {
        return this.service.expire(id);
    }

    @Security('jwt', ['roles:manage'])
    @Put('{id}')
    public updateUserRole(@Path() id: string, @Body() model: UserRole) {
        return super.update(id,model);
    }

    @Security('jwt', ['roles:manage'])
    @Delete('{id}')
    public deleteUserRole(@Path() id:string) {
        return super.delete(id);
    }
}

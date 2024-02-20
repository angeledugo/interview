
import { RoleProtected } from './role-protected.decorator';
import { AuthGuard } from '@nestjs/passport';
import { applyDecorators, UseGuards } from '@nestjs/common';
import { TypesRol } from '../../constants/glob/roles';
import { UserRoleGuard } from '../guards/user-role.guard';


export function Auth(...roles: TypesRol[]) {
    return applyDecorators(
        RoleProtected(...roles),
        UseGuards(AuthGuard(), UserRoleGuard),
    );
}
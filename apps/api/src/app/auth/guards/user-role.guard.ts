import { CanActivate, ExecutionContext, ForbiddenException, Injectable, InternalServerErrorException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';
import { META_ROLES } from '../decorators/role-protected.decorator';
import { Usuario } from '@prisma/client';

@Injectable()
export class UserRoleGuard implements CanActivate {

  constructor(
    private readonly reflector: Reflector,
  ) { }

  canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
    const req = context.switchToHttp().getRequest();
    const user = req.user as Usuario;
    if (!user)
      throw new InternalServerErrorException('User not found in guard (UserRoleGuard)');
    const validRoles: string[] = this.reflector.get(META_ROLES, context.getHandler());
    if (validRoles.length <= 0) return true;
    for (const role of user.role) {
      if (validRoles.includes(role))
        return true;
    }
    throw new ForbiddenException(`User ${user.username} need a valid role: [ ${validRoles} ]`);
  }

}

import { SetMetadata } from '@nestjs/common';
import { TypesRol } from '../../constants/glob/roles';

export const META_ROLES = 'roles';

export const RoleProtected = (...args: TypesRol[]) => {
    return SetMetadata(META_ROLES, args);
}

import { SetMetadata } from '@nestjs/common'; //  create the decorator
import { UserRole } from 'src/modules/user/entities/user.entity';

export const ROLES_KEY = 'roles';
export const Roles = (...roles: UserRole[]) => SetMetadata(ROLES_KEY, roles);

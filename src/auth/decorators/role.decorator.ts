import { SetMetadata } from "@nestjs/common"; //  create the decorator
import { UserRole } from '../../entities/user.entity'

export const ROLES_KEY = 'roles';
export const Roles = (...roles: UserRole[]) => SetMetadata(ROLES_KEY, roles);
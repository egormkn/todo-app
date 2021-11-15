import { SetMetadata } from '@nestjs/common';
import { UserRole } from '../../common/interfaces/user.interface';

export const ROLES_KEY = 'roles';

/**
 * Set the roles that have access to the route
 * @param roles The roles that are alowed to activate the route.
 */
export const Roles = (...roles: UserRole[]) => SetMetadata(ROLES_KEY, roles);

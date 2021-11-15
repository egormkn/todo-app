import { CanActivate, ExecutionContext, Injectable, Logger } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Request } from 'express';
import { UserInterface, UserRole } from '../../common/interfaces/user.interface';
import { ROLES_KEY } from '../decorators/roles.decorator';

@Injectable()
export class AuthorizationGuard implements CanActivate {
  private readonly logger = new Logger(AuthorizationGuard.name);

  constructor(private readonly reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const roles = this.reflector.getAllAndOverride<UserRole[]>(ROLES_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);
    if (!roles || roles.length === 0) {
      return true;
    }
    const req = context.switchToHttp().getRequest<Request>();
    const user = req.user as UserInterface;
    const isAuthorized = user && roles.includes(user.role);
    this.logger.verbose(isAuthorized ? '✔ Authorized' : '✖ Not authorized');
    return isAuthorized;
  }
}

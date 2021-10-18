import { CanActivate, ExecutionContext, Injectable, Logger } from '@nestjs/common';
import { Request } from 'express';

@Injectable()
export class AuthenticationGuard implements CanActivate {
  private readonly logger = new Logger(AuthenticationGuard.name);

  canActivate(context: ExecutionContext): boolean {
    const req = context.switchToHttp().getRequest<Request>();
    const isAuthenticated = req.isAuthenticated();
    this.logger.verbose(isAuthenticated ? '✔ Authenticated' : '✖ Not authenticated');
    return isAuthenticated;
  }
}

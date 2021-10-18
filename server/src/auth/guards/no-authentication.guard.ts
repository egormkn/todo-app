import { CanActivate, ExecutionContext, Injectable, Logger } from '@nestjs/common';
import { Request } from 'express';

@Injectable()
export class NoAuthenticationGuard implements CanActivate {
  private readonly logger = new Logger(NoAuthenticationGuard.name);

  canActivate(context: ExecutionContext): boolean {
    const req = context.switchToHttp().getRequest<Request>();
    const isUnauthenticated = req.isUnauthenticated();
    this.logger.verbose(isUnauthenticated ? '✔ Not authenticated' : '✖ Authenticated');
    return isUnauthenticated;
  }
}

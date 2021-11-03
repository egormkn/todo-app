import { ExecutionContext, Injectable, Logger, UnauthorizedException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { AuthGuard } from '@nestjs/passport';
import { PUBLIC_KEY } from '../../decorators/allow-no-auth.decorator';

@Injectable()
export class GoogleAuthGuard extends AuthGuard('google') {
  private readonly logger = new Logger(GoogleAuthGuard.name);

  constructor(private readonly reflector: Reflector) {
    super();
  }

  canActivate(context: ExecutionContext) {
    const isPublic = this.reflector.getAllAndOverride<boolean>(PUBLIC_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);
    return isPublic || super.canActivate(context);
  }

  handleRequest(err: any, user: any, info: any, context: any, status?: any) {
    const isAuthenticated = !err && user;
    this.logger.verbose(
      isAuthenticated ? '✔ Authenticated with Google' : '✖ Not authenticated with Google',
    );
    if (!isAuthenticated) {
      throw err || new UnauthorizedException(info?.message);
    }
    return user;
  }
}

import { BadRequestException, ExecutionContext, Injectable, Logger } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { AuthGuard } from '@nestjs/passport';
import { PUBLIC_KEY } from '../../decorators/allow-no-auth.decorator';

@Injectable()
export class LocalAuthGuard extends AuthGuard('local') {
  private readonly logger = new Logger(LocalAuthGuard.name);

  constructor(private readonly reflector: Reflector) {
    super({
      badRequestMessage: 'Please provide username and password',
    });
  }

  canActivate(context: ExecutionContext) {
    const isPublic = this.reflector.getAllAndOverride<boolean>(PUBLIC_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);
    return isPublic || super.canActivate(context);
  }

  handleRequest(err: any, user: any, info: any, context: any, status?: any) {
    const isValidPassword = !err && user;
    this.logger.verbose(isValidPassword ? '✔ Valid password' : '✖ Invalid password');
    if (!isValidPassword) {
      throw err || new BadRequestException(info?.message);
    }
    return user;
  }
}

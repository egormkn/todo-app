import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class GoogleAuthGuard extends AuthGuard('google') {
  private readonly logger = new Logger(GoogleAuthGuard.name);

  constructor(private readonly configService: ConfigService) {
    super();
  }

  // async canActivate(context: ExecutionContext) {
  //   const req = context.switchToHttp().getRequest<Request>();
  //   const user = req.user as UserInterface;
  //   const account = user?.accounts.find((account) => account.type === 'google');
  //   if (account) {
  //     this.logger.verbose('Authenticated with google strategy before');
  //     return true;
  //   }
  //   if (!req.url.startsWith('/auth/google/callback')) {
  //     const session = req.session as Record<string, any>;
  //     session.intent = req.url;
  //   }
  //   const result = (await super.canActivate(context)) as boolean;
  //   if (result) {
  //     this.logger.verbose('Authenticated with google strategy');
  //     this.logger.verbose(user);
  //     await super.logIn(req);
  //     return true;
  //   } else {
  //     this.logger.verbose('Not authenticated with google strategy');
  //     throw new UnauthorizedException('Failed to authenticate with Google');
  //   }
  // }
}

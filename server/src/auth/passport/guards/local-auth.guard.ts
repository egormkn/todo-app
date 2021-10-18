/* eslint-disable @typescript-eslint/no-unused-vars */

import { ExecutionContext, Injectable, Logger, UnauthorizedException } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Request } from 'express';
import { UserInterface } from '../../../common/interfaces/user.interface';

@Injectable()
export class LocalAuthGuard extends AuthGuard('local') {
  private readonly logger = new Logger(LocalAuthGuard.name);

  constructor() {
    super({
      badRequestMessage: 'Please provide username and password',
    });
  }

  // async canActivate(context: ExecutionContext) {
  //   const req = context.switchToHttp().getRequest<Request>();
  //   const user = req.user as UserInterface;
  //   const result = (await super.canActivate(context)) as boolean;
  //   if (result) {
  //     this.logger.verbose('Authenticated with local strategy');
  //     this.logger.verbose(user);
  //     await super.logIn(req);
  //     return true;
  //   } else {
  //     this.logger.verbose('Not authenticated with local strategy');
  //     throw new UnauthorizedException('Wrong username or password');
  //   }
  // }

  // handleRequest<UserInterface>(err: Error, user: UserInterface, info: any) {
  //   if (err || !user) {
  //     throw err || new UnauthorizedException(info?.message);
  //   }
  //   return user;
  // }
}

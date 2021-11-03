import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { Request } from 'express';
import { Strategy } from 'passport-vkontakte';
import { UserInterface } from '../../../common/interfaces/user.interface';
import { AuthService } from '../../auth.service';
import { ConnectAccountDto } from '../../dto/connect-account.dto';

@Injectable()
export class VkontakteStrategy extends PassportStrategy(Strategy, 'vkontakte') {
  private readonly logger = new Logger(VkontakteStrategy.name);

  constructor(private readonly authService: AuthService, readonly configService: ConfigService) {
    super({
      clientID: configService.get<string>('VKONTAKTE_CLIENT_ID'),
      clientSecret: configService.get<string>('VKONTAKTE_CLIENT_SECRET'),
      callbackURL: configService.get<string>('VKONTAKTE_CALLBACK_URL'),
      scope: configService.get<string>('VKONTAKTE_SCOPE', '').split(','),
      passReqToCallback: true,
    });
  }

  async validate(
    req: Request,
    accessToken: string,
    refreshToken: string,
    profile: any,
  ): Promise<UserInterface> {
    const { id, ...data } = profile;
    const info: Partial<UserInterface> = {
      name: profile.displayName,
    };
    const connectAccountDto: ConnectAccountDto = {
      type: 'vkontakte',
      id,
      info,
      data: {
        ...data,
        accessToken,
        refreshToken,
      },
    };
    if (req.isAuthenticated()) {
      const user = req.user as UserInterface;
      return this.authService.connectAccount(connectAccountDto, user);
    } else {
      return this.authService.loginWithAccount(connectAccountDto);
    }
  }
}

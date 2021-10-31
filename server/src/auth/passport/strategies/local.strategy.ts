import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthService } from '../../auth.service';
import { UserInterface } from '../../../common/interfaces/user.interface';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    super();
  }

  async validate(username: string, password: string): Promise<UserInterface | null> {
    const user = await this.authService.logIn({ username, password });
    if (!user) {
      throw new UnauthorizedException('Wrong username or password');
    }
    return user;
  }
}

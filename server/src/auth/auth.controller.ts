import { BadRequestException, Body, Controller, Get, Post } from '@nestjs/common';
import { ApiBody, ApiTags } from '@nestjs/swagger';
import { UserInterface } from '../common/interfaces/user.interface';
import { AuthService } from './auth.service';
import { Auth } from './decorators/auth.decorator';
import { NoAuth } from './decorators/no-auth.decorator';
import { OptionalAuth } from './decorators/optional-auth.decorator';
import { User } from './decorators/user.decorator';
import { LogInDto } from './dto/log-in.dto';
import { SignUpDto } from './dto/sign-up.dto';
import { GoogleAuthGuard } from './passport/guards/google-auth.guard';
import { LocalAuthGuard } from './passport/guards/local-auth.guard';
import { VkontakteAuthGuard } from './passport/guards/vkontakte-auth.guard';

@Controller('auth')
@ApiTags('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  @NoAuth(LocalAuthGuard)
  @ApiBody({ type: LogInDto })
  async logIn(@User() user: UserInterface) {
    const token = await this.authService.issueJwt(user);
    return { access_token: token };
  }

  @Post('signup')
  @NoAuth()
  async signUp(@Body() signUpDto: SignUpDto) {
    const user = await this.authService.signUp(signUpDto);
    if (user) {
      const token = await this.authService.issueJwt(user);
      return { access_token: token };
    }
    throw new BadRequestException('Failed to sign up');
  }

  @Post('logout')
  @Auth()
  async logOut(@User() user: UserInterface) {
    return this.authService.logOut(user);
  }

  @Get('google')
  @OptionalAuth(GoogleAuthGuard)
  async logInWithGoogle(@User() user: UserInterface) {
    console.log(user);
    const token = await this.authService.issueJwt(user);
    return { access_token: token };
  }

  @Get('vkontakte')
  @OptionalAuth(VkontakteAuthGuard)
  async logInWithVkontakte(@User() user: UserInterface) {
    const token = await this.authService.issueJwt(user);
    return { access_token: token };
  }

  // @Get('test')
  // @OptionalAuth()
  // async test(@User() user?: UserInterface) {
  //   return { user };
  // }

  // @Get('test2')
  // @Auth()
  // async test2(@User() user?: UserInterface) {
  //   return { user };
  // }
}

import { BadRequestException, Body, Controller, Post, UseGuards } from '@nestjs/common';
import { ApiBody, ApiTags } from '@nestjs/swagger';
import { UserInterface } from 'src/common/interfaces/user.interface';
import { AuthService } from './auth.service';
import { Auth } from './decorators/auth.decorator';
import { NoAuth } from './decorators/no-auth.decorator';
import { User } from './decorators/user.decorator';
import { LogInDto } from './dto/log-in.dto';
import { SignUpDto } from './dto/sign-up.dto';
import { LocalAuthGuard } from './passport/guards/local-auth.guard';

@Controller('auth')
@ApiTags('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  @UseGuards(LocalAuthGuard)
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

  // @Get('google')
  // @UseGuards(GoogleAuthGuard)
  // @Redirect('/')
  // getGoogle() {
  //   // Handle Google OAuth
  // }

  // @Get('google/callback')
  // @UseGuards(GoogleAuthGuard)
  // @Redirect()
  // getGoogleCallback(@Session() session: Record<string, any>) {
  //   const url = session.intent ?? '/';
  //   delete session.intent;
  //   return { url };
  // }

  // @Get('vkontakte')
  // @UseGuards(VkontakteAuthGuard)
  // @Redirect('/')
  // getVkontakte() {
  //   // Handle Vkontakte OAuth
  // }

  // @Get('vkontakte/callback')
  // @UseGuards(VkontakteAuthGuard)
  // @Redirect()
  // vkontakteCallback(@Session() session: Record<string, any>) {
  //   const url = session.intent ?? '/';
  //   delete session.intent;
  //   return { url };
  // }
}

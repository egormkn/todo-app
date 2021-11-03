import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { UsersModule } from '../users/users.module';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { GoogleStrategy } from './passport/strategies/google.strategy';
import { JwtStrategy } from './passport/strategies/jwt.strategy';
import { LocalStrategy } from './passport/strategies/local.strategy';
import { VkontakteStrategy } from './passport/strategies/vkontakte.strategy';

@Module({
  imports: [
    ConfigModule,
    UsersModule,
    PassportModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get<string>('JWT_SECRET'),
        signOptions: { expiresIn: configService.get<string>('JWT_TIMEOUT', '30m') },
      }),
      inject: [ConfigService],
    }),
  ],
  providers: [AuthService, LocalStrategy, JwtStrategy, GoogleStrategy, VkontakteStrategy],
  controllers: [AuthController],
  exports: [AuthService],
})
export class AuthModule {}

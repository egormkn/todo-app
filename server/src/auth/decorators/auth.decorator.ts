import { UseGuards, applyDecorators } from '@nestjs/common';
import { ApiBearerAuth, ApiUnauthorizedResponse } from '@nestjs/swagger';
import { AuthenticationGuard } from '../guards/authentication.guard';
import { AuthorizationGuard } from '../guards/authorization.guard';
import { JwtAuthGuard } from '../passport/guards/jwt-auth.guard';

export const Auth = (...guards: Parameters<typeof UseGuards>) =>
  applyDecorators(
    UseGuards(JwtAuthGuard, AuthenticationGuard, AuthorizationGuard, ...guards),
    ApiBearerAuth(),
    ApiUnauthorizedResponse({ description: 'Unauthorized' }),
  );

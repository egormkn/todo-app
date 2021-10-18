import { UseGuards } from '@nestjs/common';
import { NoAuthenticationGuard } from '../guards/no-authentication.guard';

export const NoAuth = (...guards: Parameters<typeof UseGuards>) =>
  UseGuards(NoAuthenticationGuard, ...guards);

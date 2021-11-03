import { UseGuards } from '@nestjs/common';
import { NoAuthenticationGuard } from '../guards/no-authentication.guard';

/**
 * Require the user to be not authenticated to access the route.
 * @param guards Additional guards to apply on successful activation.
 */
export const NoAuth = (...guards: Parameters<typeof UseGuards>) =>
  UseGuards(NoAuthenticationGuard, ...guards);

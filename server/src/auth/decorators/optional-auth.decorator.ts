import { UseGuards, applyDecorators } from '@nestjs/common';
import { ApiBearerAuth, ApiSecurity } from '@nestjs/swagger';
import { OptionalJwtAuthGuard } from '../passport/guards/optional-jwt-auth.guard';

/**
 * Optionally allow the user to be authenticated to access the route.
 * @param guards Additional guards to apply on successful activation.
 */
export const OptionalAuth = (...guards: Parameters<typeof UseGuards>) =>
  applyDecorators(UseGuards(OptionalJwtAuthGuard, ...guards), ApiSecurity({}), ApiBearerAuth());

import { SetMetadata } from '@nestjs/common';

/**
 * Metadata key used to mark routes as public
 */
export const PUBLIC_KEY = 'public';

/**
 * Mark a route as public, so that it could be accessed even if
 * authentication is required by an outer context.
 */
export const AllowNoAuth = () => SetMetadata(PUBLIC_KEY, true);

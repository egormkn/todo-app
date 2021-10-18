import { SetMetadata } from '@nestjs/common';

export const PUBLIC_KEY = 'public';

export const AllowNoAuth = () => SetMetadata(PUBLIC_KEY, true);

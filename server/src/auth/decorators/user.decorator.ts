import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { Request } from 'express';
import { UserInterface } from '../../common/interfaces/user.interface';

/**
 * Get the user or its specific property from an express request object.
 * @param data A property of the user object to get.
 */
export const User = createParamDecorator<keyof UserInterface>(
  (data: keyof UserInterface, context: ExecutionContext) => {
    const req = context.switchToHttp().getRequest<Request>();
    const user = req.user as UserInterface | undefined;
    return data ? user?.[data] : user;
  },
);

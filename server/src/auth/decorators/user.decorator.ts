import { ExecutionContext, createParamDecorator } from '@nestjs/common';
import { Request } from 'express';
import { UserInterface } from '../../common/interfaces/user.interface';

export const User = createParamDecorator<keyof UserInterface>(
  (data: keyof UserInterface, context: ExecutionContext) => {
    const req = context.switchToHttp().getRequest<Request>();
    const user = req.user as UserInterface;
    return data ? user?.[data] : user;
  },
);

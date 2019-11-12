import { Request } from 'express';
import { createParamDecorator } from '@nestjs/common';

import { User as UserEntity } from './user.entity';

export const User = createParamDecorator((data: string, req: Request) => {
  return (data ? req.user && req.user[data] : req.user) as
    | Partial<UserEntity>
    | UserEntity;
});

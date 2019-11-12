import { JwtModuleOptions } from '@nestjs/jwt';

export const jwtConstants: JwtModuleOptions = {
  secret: process.env.SECRET_KEY,
  signOptions: {
    expiresIn: '2h',
  },
};

export default jwtConstants;

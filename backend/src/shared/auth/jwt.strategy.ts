import { Injectable } from '@nestjs/common';
import { InjectConfig, ConfigService } from 'nestjs-config';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(@InjectConfig() private readonly config: ConfigService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: config.get('jwt.secret'),
    });
  }

  // async validate(payload: JwtPayload) {
  //   const user = await this.authService.validateUser(payload);

  //   if (!user) {
  //     throw new UnauthorizedException('Token is invalid!');
  //   }

  //   const { password, ...rest } = user;

  //   return rest;
  // }

  async validate(payload: any) {
    return { userId: payload.sub, username: payload.username };
  }
}

import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from 'nestjs-config';
import { I18nService } from 'nestjs-i18n';

import * as R from 'ramda';
import * as argon from 'argon2';

import { User } from '@/users/user.entity';
import { UsersService } from '@/users/users.service';

import { JwtResponse } from './auth.interface';

@Injectable()
export class AuthService {
  constructor(
    private readonly configService: ConfigService,
    private readonly jwtService: JwtService,
    private readonly localeService: I18nService,
    private readonly usersService: UsersService,
  ) {}

  async signIn(user: Partial<User>): Promise<JwtResponse> {
    const payload = { username: user.username, sub: user.id };

    return {
      expiresIn: this.configService.get('jwt.signOptions.expiresIn'),
      accessToken: this.jwtService.sign(payload),
    };
  }

  async validateUser(
    username: string,
    password: string,
    lang: string = this.configService.get('locale.fallbackLanguage'),
  ): Promise<Partial<User>> {
    const user = await this.usersService.findByUsername(username);

    if (R.or(R.isNil(user), R.isEmpty(user))) {
      throw new NotFoundException(
        this.localeService.translate('users.FIND_BY_USERNAME.NOT_FOUND', {
          lang,
          args: { username },
        }),
      );
    }

    const match = await argon.verify(user.password, password);

    if (!match) {
      throw new UnauthorizedException(
        this.localeService.translate('auth.AUTH.PASSWORD_NOT_MATCH', { lang }),
      );
    }

    user.lastLogin = new Date();
    await this.usersService.save(user);

    const { password: pass, ...rest } = user;

    return rest;
  }
}

import { Controller, Request, Get, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiUseTags, ApiBearerAuth, ApiOperation } from '@nestjs/swagger';

import { UsersService } from '@/users/users.service';
import { User } from '@/users/user.decorator';
import { User as UserEntity } from '@/users/user.entity';

import { AuthService } from './auth.service';

@ApiBearerAuth()
@ApiUseTags('auth')
@Controller()
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly usersService: UsersService,
  ) {}

  @UseGuards(AuthGuard('local'))
  @Post('login')
  @ApiOperation({ title: 'Log in to dashboard' })
  async login(@Request() req) {
    return this.authService.signIn(req.user);
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('profile')
  @ApiOperation({ title: 'Get user profile' })
  getProfile(@User() user: UserEntity) {
    return this.usersService.findByUsername(user.username);
  }

  // @Get('csrfToken')
  // @ApiOperation({ title: 'Get csrf token' })
  // getCsrfToken(@Request() req) {
  //   return {
  //     token: req.csrfToken(),
  //   };
  // }
}

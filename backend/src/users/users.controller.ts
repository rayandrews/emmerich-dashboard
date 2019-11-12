import {
  Controller,
  ValidationPipe,
  Put,
  Body,
  UsePipes,
  Post,
  Delete,
  Param,
  UseGuards,
  Get,
} from '@nestjs/common';
import { ApiUseTags, ApiBearerAuth } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';

import * as R from 'ramda';

import { AuthService } from '@/shared/auth/auth.service';

import { User } from './user.entity';
import { UsersService } from './users.service';
import { User as UserDecorator } from './user.decorator';
import { UserResponse } from './users.interface';
import { CreateUserDto, UpdateUserDto } from './dto';

@ApiUseTags('user')
@ApiBearerAuth()
@Controller()
export class UsersController {
  constructor(
    private readonly userService: UsersService,
    private readonly authService: AuthService,
  ) {}

  private async buildUserResponseObject(user: User): Promise<UserResponse> {
    const userWithoutPassword = R.omit(['password'], user);
    return {
      ...userWithoutPassword,
      token: await this.authService.signIn(userWithoutPassword),
    };
  }

  @UseGuards(AuthGuard('jwt'))
  @Get()
  async getAll() {
    return this.userService.findAll();
  }

  @UseGuards(AuthGuard('jwt'))
  @Put()
  async update(
    @UserDecorator('id') userId: number,
    @Body() userData: UpdateUserDto,
  ): Promise<Partial<User>> {
    const user = await this.userService.update(userId, userData);
    return R.omit(['password'], user);
  }

  @UsePipes(new ValidationPipe())
  @Post('/withLogin')
  async createWithLogin(
    @Body() userData: CreateUserDto,
  ): Promise<UserResponse> {
    const newUser = await this.userService.create(userData);
    return await this.buildUserResponseObject(newUser);
  }

  @UsePipes(new ValidationPipe())
  @Post()
  async create(@Body() userData: CreateUserDto): Promise<Partial<User>> {
    return await this.userService.create(userData, false);
  }

  @UseGuards(AuthGuard('jwt'))
  @Delete(':slug')
  async delete(@Param() params) {
    return await this.userService.delete(params.slug);
  }
}

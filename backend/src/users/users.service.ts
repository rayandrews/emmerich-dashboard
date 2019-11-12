import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, getRepository, DeleteResult } from 'typeorm';
import { validate } from 'class-validator';

import * as argon from 'argon2';

import { User } from './user.entity';
import { CreateUserDto, UpdateUserDto } from './dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
  ) {}

  async findAll(): Promise<User[]> {
    return await this.userRepository.find();
  }

  async findByUsername(username: string): Promise<User | undefined> {
    return await this.userRepository.findOne({ username });
  }

  async findByEmail(email: string): Promise<User | undefined> {
    return await this.userRepository.findOne({ email });
  }

  async create(userInput: CreateUserDto, login: boolean = true): Promise<User> {
    // check uniqueness of username / email
    const errorInput = await validate(userInput);

    if (errorInput.length > 0) {
      const errorInvalid = { username: 'User input is not valid.' };
      throw new HttpException(
        { message: 'Input data validation failed', errorInvalid },
        HttpStatus.BAD_REQUEST,
      );
    }

    const { username, email, name, password } = userInput;

    const qb = await getRepository(User)
      .createQueryBuilder('user')
      .where('user.username = :username', { username })
      .orWhere('user.email = :email', { email });

    const user = await qb.getOne();

    if (user) {
      const errorUnique = { username: 'Username and email must be unique.' };
      throw new HttpException(
        { message: 'Input data validation failed', errors: errorUnique },
        HttpStatus.BAD_REQUEST,
      );
    }

    // create new user
    const newUser = new User();

    newUser.name = name;
    newUser.username = username;
    newUser.email = email;
    newUser.password = await argon.hash(password);
    if (login) {
      newUser.lastLogin = new Date();
    }

    const errors = await validate(newUser);

    if (errors.length > 0) {
      const errorInvalid = { username: 'User input is not valid.' };
      throw new HttpException(
        { message: 'Input data validation failed', errorInvalid },
        HttpStatus.BAD_REQUEST,
      );
    } else {
      const savedUser = await this.userRepository.save(newUser);
      return savedUser;
    }
  }

  async save(user: User): Promise<User | undefined> {
    return await this.userRepository.save(user);
  }

  async update(id: number, dto: UpdateUserDto): Promise<User> {
    const toUpdate = await this.userRepository.findOne(id);
    delete toUpdate.password;

    const updated = Object.assign(toUpdate, dto);
    return await this.userRepository.save(updated);
  }

  async delete(username: string): Promise<DeleteResult> {
    return await this.userRepository.delete({ username });
  }
}

import { IsNotEmpty, IsEmail, Length } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @ApiProperty()
  @IsNotEmpty()
  @Length(4, 20)
  readonly username: string;

  @ApiProperty()
  @IsNotEmpty()
  @Length(4, 30)
  @IsEmail()
  readonly email: string;

  @ApiProperty()
  @IsNotEmpty()
  @Length(8, 100)
  readonly password: string;

  @ApiProperty()
  @IsNotEmpty()
  @Length(2, 50)
  readonly name: string;
}

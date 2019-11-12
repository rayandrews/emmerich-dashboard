import { IsNotEmpty, IsEmail, Length } from 'class-validator';
import { ApiModelProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @ApiModelProperty()
  @IsNotEmpty()
  @Length(4, 20)
  readonly username: string;

  @ApiModelProperty()
  @IsNotEmpty()
  @Length(4, 30)
  @IsEmail()
  readonly email: string;

  @ApiModelProperty()
  @IsNotEmpty()
  @Length(8, 100)
  readonly password: string;

  @ApiModelProperty()
  @IsNotEmpty()
  @Length(2, 50)
  readonly name: string;
}

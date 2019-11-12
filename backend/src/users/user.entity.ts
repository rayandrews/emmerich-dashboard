import { Entity, Column, Unique, ManyToMany } from 'typeorm';
import { Length, IsDate, IsEmail, IsOptional } from 'class-validator';
import { Exclude } from 'class-transformer';

import { BaseEntity } from '@/shared/entity/base.entity';
import { Role } from '@/shared/access-control/role.entity';

@Entity('users')
@Unique(['username'])
export class User extends BaseEntity {
  @Column()
  @Length(4, 20)
  username: string;

  @Column()
  @Length(2, 50)
  name: string;

  @Column()
  @Length(4, 30)
  @IsEmail()
  email: string;

  @Exclude()
  @Column()
  @Length(25, 100)
  password: string;

  @Column({ nullable: true })
  @IsOptional()
  @IsDate()
  lastLogin: Date;

  @ManyToMany(type => Role, role => role.users, { eager: true })
  roles: Role[];

  // @BeforeInsert()
  // async hashPassword() {
  //   this.password = await argon2.hash(this.password);
  // }
}

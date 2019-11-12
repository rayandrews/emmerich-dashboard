import { Entity, Column, Index, Unique, ManyToMany, JoinTable } from 'typeorm';

import { BaseEntity } from '@/shared/entity/base.entity';

import { Permission } from './permission.entity';

import { User } from '@/users/user.entity';

@Entity('roles')
@Unique(['name'])
export class Role extends BaseEntity {
  @Index()
  @Column()
  name: string;

  @ManyToMany(type => Permission, permission => permission.roles, {
    eager: true,
  })
  @JoinTable({
    name: 'roles-permissions',
  })
  permissions: Permission[];

  @ManyToMany(type => User, user => user.roles)
  @JoinTable({
    name: 'roles-users',
  })
  users: User[];
}

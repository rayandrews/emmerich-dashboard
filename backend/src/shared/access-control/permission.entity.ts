import { Entity, Column, Index, Unique, ManyToMany, OneToOne } from 'typeorm';

import { BaseEntity } from '@/shared/entity/base.entity';

import { Role } from './role.entity';
import { Resource } from './resource.entity';

@Entity('permissions')
@Unique(['name'])
export class Permission extends BaseEntity {
  @Index()
  @Column()
  name: string;

  @Column()
  action: string;

  @OneToOne(type => Resource)
  resource: Resource;

  @Column()
  attributes: string = '*';

  @ManyToMany(type => Role, role => role.permissions)
  roles: Role[];
}

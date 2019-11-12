import { Entity, Column, Index, Unique, ManyToMany } from 'typeorm';

import { BaseEntity } from '@/shared/entity/base.entity';

@Entity('resources')
@Unique(['name'])
export class Resource extends BaseEntity {
  @Index()
  @Column()
  name: string;
}

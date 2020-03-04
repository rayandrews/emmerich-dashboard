import { Index, Entity, Column, OneToMany } from 'typeorm';
import { Length } from 'class-validator';

import { BaseEntity } from '@/shared/entity/base.entity';
import { Journal } from '@/accounting/journals/journal.entity';

@Entity('accounting-transactions')
export class Transaction extends BaseEntity {
  @Index()
  @Column()
  @Length(3, 20)
  transactionId: string;

  @OneToMany(type => Journal, journal => journal.transaction, {
    eager: true,
    onDelete: 'CASCADE'
  })
  journals: Journal[];
}

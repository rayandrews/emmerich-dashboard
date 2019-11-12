import { Entity, Column, OneToMany } from 'typeorm';
import { Length } from 'class-validator';

import { BaseEntity } from '@/shared/entity/base.entity';
import { Account } from '@/accounting/accounts/account.entity';

export enum LedgerType {
  ASSET = 'asset',
  LIABILITY = 'liability',
  EQUITY = 'equity',
  INCOME = 'income',
  EXPENSE = 'expense',
}

@Entity('accounting-ledgers')
export class Ledger extends BaseEntity {
  @Column()
  @Length(3, 20)
  name: string;

  @OneToMany(type => Account, account => account.ledger)
  accounts: Account[];

  @Column({
    type: 'enum',
    enum: LedgerType,
    default: LedgerType.ASSET,
  })
  type: LedgerType;
}

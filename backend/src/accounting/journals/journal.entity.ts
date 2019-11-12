import { Entity, Column, ManyToOne, Index } from 'typeorm';
import { Length } from 'class-validator';

import { BaseEntity } from '@/shared/entity/base.entity';
import { Account } from '@/accounting/accounts/account.entity';
import { Transaction } from '@/accounting/transactions/transaction.entity';

import { TransactionType } from './journal.interface';

@Entity('accounting-journals')
export class Journal extends BaseEntity {
  @ManyToOne(type => Transaction, transaction => transaction.journals)
  transaction: Transaction;

  @Column()
  @Length(5)
  currency: string;

  @Column({
    type: 'bigint',
  })
  amount: number = null;

  @Column({
    type: 'enum',
    enum: TransactionType,
    default: TransactionType.CREDIT,
  })
  type: TransactionType;

  @Column({
    type: 'text',
    nullable: true,
  })
  memo: string = null;

  @ManyToOne(type => Account, account => account.journals)
  account!: Account;

  // @Column({
  //   type: 'bigint',
  //   nullable: true,
  // })
  // debit: number = null;

  // @Column({
  //   type: 'bigint',
  //   nullable: true,
  // })
  // credit: number = null;
}

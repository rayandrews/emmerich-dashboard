import {
  Entity,
  Tree,
  Column,
  TreeParent,
  TreeChildren,
  OneToMany,
} from 'typeorm';
import { Length } from 'class-validator';

import { BaseEntity } from '@/shared/entity/base.entity';
import { Journal } from '@/accounting/journals/journal.entity';

export enum LedgerType {
  ASSET = 'asset',
  LIABILITY = 'liability',
  EQUITY = 'equity',
  INCOME = 'income',
  EXPENSE = 'expense',
}

@Entity('accounting-accounts')
@Tree('materialized-path')
export class Account extends BaseEntity {
  @Column()
  @Length(3, 20)
  name!: string;

  @Column({
    type: 'bigint',
  })
  startingCredit: string = '0';

  @Column({
    type: 'bigint',
  })
  startingDebit: string = '0';

  @Column()
  @Length(5)
  currency: string = 'IDR';

  @TreeParent()
  parent: Account;

  @TreeChildren()
  children: Account[];

  @Column({
    type: 'enum',
    enum: LedgerType,
    default: LedgerType.ASSET,
  })
  type: LedgerType;

  @OneToMany(type => Journal, journal => journal.account, {
    eager: true,
  })
  journals: Journal[];

  // getBalance(currency: dinero.Currency = 'IDR') {
  //   return dinero({
  //     amount: Number(this.balance),
  //     currency: 'IDR',
  //   }).getAmount();
  // }

  // @AfterLoad()
  // updateBalance() {
  //   // console.log(this.journals);
  //   if (R.not(R.or(R.isNil, R.isEmpty)(this.journals))) {
  //     const balance = this.journals.reduce((amount, journal) => {
  //       switch (journal.type) {
  //         case TransactionType.CREDIT:
  //           amount -= journal.amount;
  //           break;

  //         default:
  //           amount += journal.amount;
  //       }
  //       // if (journal.type === TransactionType.CREDIT) {
  //       //   amount -= journal.amount;
  //       // } else {
  //       //   amount += journal.amount;
  //       // }

  //       return amount;
  //     }, 0);
  //     this.balance = String(balance);
  //   }
  // }
}

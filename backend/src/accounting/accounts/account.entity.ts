import {
  Entity,
  Tree,
  Column,
  ManyToOne,
  TreeParent,
  TreeChildren,
  OneToMany,
  AfterLoad,
} from 'typeorm';
import { Length } from 'class-validator';

import * as R from 'ramda';
import * as dinero from 'dinero.js';

import { BaseEntity } from '@/shared/entity/base.entity';
import { Ledger } from '@/accounting/ledgers/ledger.entity';
import { Journal } from '@/accounting/journals/journal.entity';
import { TransactionType } from '@/accounting/journals/journal.interface';

@Entity('accounting-accounts')
@Tree('materialized-path')
export class Account extends BaseEntity {
  @Column()
  @Length(3, 20)
  name!: string;

  @Column({
    type: 'bigint',
  })
  balance: string = '0';

  @Column({
    type: 'bigint',
  })
  startingBalance: string = '0';

  @Column()
  @Length(5)
  currency: string = 'IDR';

  @TreeParent()
  parent: Account;

  @TreeChildren()
  children: Account[];

  @ManyToOne(type => Ledger, ledger => ledger.accounts)
  ledger: Ledger;

  @OneToMany(type => Journal, journal => journal.account, {
    eager: true,
  })
  journals: Journal[];

  getBalance(currency: dinero.Currency = 'IDR') {
    return dinero({
      amount: Number(this.balance),
      currency: 'IDR',
    }).getAmount();
  }

  @AfterLoad()
  updateBalance() {
    // console.log(this.journals);
    if (R.not(R.or(R.isNil, R.isEmpty)(this.journals))) {
      const balance = this.journals.reduce((amount, journal) => {
        switch (journal.type) {
          case TransactionType.CREDIT:
            amount -= journal.amount;
            break;

          default:
            amount += journal.amount;
        }
        // if (journal.type === TransactionType.CREDIT) {
        //   amount -= journal.amount;
        // } else {
        //   amount += journal.amount;
        // }

        return amount;
      }, 0);
      this.balance = String(balance);
    }
  }
}

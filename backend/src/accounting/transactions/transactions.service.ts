import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CrudRequest } from '@nestjsx/crud';
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';
import { InjectConfig, ConfigService } from 'nestjs-config';

import * as R from 'ramda';
import * as uuid from 'uuid/v1';

import { Repository } from 'typeorm';
import { Transactional } from 'typeorm-transactional-cls-hooked';
import * as dinero from 'dinero.js';

import { Account } from '@/accounting/accounts/account.entity';
import { Journal } from '@/accounting/journals/journal.entity';
import {
  TransactionType,
  JournalItemPayload,
} from '@/accounting/journals/journal.interface';

import { Transaction } from './transaction.entity';

@Injectable()
export class TransactionsService extends TypeOrmCrudService<Transaction> {
  protected defaultCurrency: dinero.Currency;

  constructor(
    @InjectRepository(Account)
    private readonly accountRepository: Repository<Account>,
    @InjectRepository(Journal)
    private readonly journalRepository: Repository<Journal>,
    @InjectRepository(Transaction)
    private readonly transactionRepository: Repository<Transaction>,
    @InjectConfig() private readonly configService: ConfigService,
  ) {
    super(transactionRepository);
    this.defaultCurrency = this.configService.get('accounting.currency');
  }

  private isCheckAndCreditEqual(journalItems: { amount: number, currency: string | dinero.Currency, type: TransactionType }[]) {
    const [credits, debits] = journalItems.reduce(
      ([tempCredits, tempDebits], journalItem) => {
        const amount = dinero({
          amount: Number(journalItem.amount),
          currency: R.defaultTo('IDR')(journalItem.currency) as dinero.Currency,
          precision: R.ifElse(R.equals('IDR'), R.always(0), R.always(2))(
            journalItem.currency,
          ),
        });

        if (journalItem.type === TransactionType.CREDIT) {
          tempCredits += amount.getAmount();
        } else {
          tempDebits += amount.getAmount();
        }

        return [tempCredits, tempDebits];
      },
      [
        0,
        0,
      ],
    );

    return credits === debits;
  }

  @Transactional()
  public async addTransaction(journalItems: JournalItemPayload[]) {
    const transactionId = uuid();

    const isEqual = this.isCheckAndCreditEqual(journalItems);

    if (!isEqual) {
      throw new BadRequestException('Debits and credits should be equal');
    }

    const promisesJournal = journalItems.map(async journalItem => {
      const account = await this.accountRepository.findOne({
        id: journalItem.account as number,
      });


      if (!account) {
        throw new BadRequestException(
          'Account id in one of journal item is not defined in database',
        );
      }

      const journal = new Journal();
      journal.type = journalItem.type;
      journal.memo = journalItem.memo;
      journal.amount = journalItem.amount;
      journal.currency = journalItem.currency;
      journal.account = account;

      return this.journalRepository.save(journal);
    });

    const journals = await Promise.all(promisesJournal);

    const transaction = new Transaction();
    transaction.transactionId = transactionId;
    transaction.journals = journals;

    await this.transactionRepository.save(transaction);

    return journals.map(R.omit(['account']));
  }

  @Transactional()
  public async updateTransaction(req: CrudRequest, transaction: Transaction) {
    const promises = [];

    promises.push(this.transactionRepository.update(req.options.params.id as number, R.omit(['journals', 'createdAt', 'updatedAt'], transaction)));

    if (!R.isNil(transaction.journals) && !R.isEmpty(transaction.journals)) {
      const isEqual = this.isCheckAndCreditEqual(transaction.journals);

      if (!isEqual) {
        throw new BadRequestException('Debits and credits should be equal');
      }

      promises.concat(transaction.journals.map(journal => this.journalRepository.update(journal.id, R.omit(['createdAt', 'updatedAt'], journal))));
    }

    await Promise.all(promises);

    const updatedTransaction = await this.transactionRepository.findOne(req.options.params.id as number);

    console.log(updatedTransaction);

    return updatedTransaction;
  }
}

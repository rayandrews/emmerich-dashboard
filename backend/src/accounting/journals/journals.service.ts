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
import { Transaction } from '@/accounting/transactions/transaction.entity';

import { Journal } from './journal.entity';
import {
  TransactionType,
  JournalItemPayload,
  TempJournalItem,
} from './journal.interface';

@Injectable()
export class JournalsService extends TypeOrmCrudService<Journal> {
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
    super(journalRepository);
    this.defaultCurrency = this.configService.get('accounting.currency');
  }

  @Transactional() // Will open a transaction if one doesn't already exist
  public async addJournalEntry(journalItems: JournalItemPayload[]) {
    const transactionId = uuid();

    const [credits, debits, journalItemContainer] = journalItems.reduce(
      ([tempCredits, tempDebits, tempJournalItemContainer], journalItem) => {
        const amount = dinero({
          amount: journalItem.amount,
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

        tempJournalItemContainer.push({ ...journalItem, amount });

        return [tempCredits, tempDebits, tempJournalItemContainer];
      },
      [
        // dinero({ amount: 0, currency: this.defaultCurrency }),
        // dinero({ amount: 0, currency: this.defaultCurrency }),
        0,
        0,
        [] as TempJournalItem[],
      ],
    );

    if (credits !== debits) {
      throw new BadRequestException('Debits and credits should be equal');
    }

    const promisesJournal = journalItemContainer.map(async journalItem => {
      const account = await this.accountRepository.findOne({
        id: journalItem.account,
      });

      if (!account) {
        throw new BadRequestException(
          'Account id in one of journal item is not defined in database',
        );
      }

      const journal = new Journal();
      journal.type = journalItem.type;
      journal.memo = journalItem.memo;
      journal.amount = journalItem.amount.getAmount();
      journal.currency = journalItem.amount.getCurrency();
      journal.account = account;

      return this.journalRepository.save(journal);
    });

    const journals = await Promise.all(promisesJournal);

    console.log(journals);

    const transaction = new Transaction();
    transaction.transactionId = transactionId;
    transaction.journals = journals;

    await this.transactionRepository.save(transaction);

    return journals.map(R.omit(['account']));
  }

  private groupJournalsByTransactionId(journals: Journal[]) {
    return R.compose(
      R.map<
        { [index: string]: Journal[] },
        { data: Journal[]; meta: object }
        // any
      >((journalsTemp: Journal[]) => {
        const { credit, debit } = R.reduce<
          Journal,
          { debit: dinero.Dinero; credit: dinero.Dinero }
        >(
          (acc, journal) => {
            acc[journal.type] = acc[journal.type].add(
              dinero({
                amount: Number(journal.amount),
                currency: R.defaultTo('IDR')(
                  journal.currency,
                ) as dinero.Currency,
                precision: R.ifElse(R.equals('IDR'), R.always(0), R.always(2))(
                  journal.currency,
                ),
              }),
            );

            return acc;
          },
          {
            [TransactionType.DEBIT]: dinero({
              amount: 0,
              currency: 'IDR' as dinero.Currency,
              precision: 0,
            }),
            [TransactionType.CREDIT]: dinero({
              amount: 0,
              currency: 'IDR' as dinero.Currency,
              precision: 0,
            }),
          },
        )(journalsTemp);

        return {
          data: journalsTemp,
          meta: { credit: credit.toObject(), debit: debit.toObject() },
        };
      }),
      R.groupBy(R.path(['transactionId'])),
    )(journals);
  }

  public async getJournalsUsingTransactionId(req: CrudRequest) {
    return await this.journalRepository
      .createQueryBuilder('journals')
      .orderBy('journals.createdAt', 'ASC')
      .getMany()
      .then(this.groupJournalsByTransactionId);
  }
}

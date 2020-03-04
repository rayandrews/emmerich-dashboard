import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CrudRequest, CrudRequestOptions, GetManyDefaultResponse } from '@nestjsx/crud';
import {
  ParsedRequestParams,
} from '@nestjsx/crud-request';
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';

import { Repository, SelectQueryBuilder } from 'typeorm';

import * as R from 'ramda';

import { Journal } from '@/accounting/journals/journal.entity';
import { TransactionType } from '@/accounting/journals/journal.interface';

import { Account } from './account.entity';
import { AccountWithChildrenBalance } from './account.interface';

@Injectable()
export class AccountsService extends TypeOrmCrudService<Account> {
  constructor(
    @InjectRepository(Account) private readonly accountRepository: Repository<Account>,
    @InjectRepository(Journal) private readonly journalRepository: Repository<Journal>,
  ) {
    super(accountRepository);
  }

  private async findBalanceForAllChildren(entity: Account, balance: number = 0) {
    // const clonedEntity = R.clone(entity); 
    const account = await this.accountRepository.manager.getTreeRepository(Account).findDescendantsTree(entity) as Account & { journals: Journal[], children: Account[] };

    const journals = await this.journalRepository.createQueryBuilder('accounting-journals').innerJoin('accounting-journals.account', 'accounting-accounts').where('accounting-journals.account.id =:id', { id: account.id }).getMany();

    let journalBalance: number = 0;
    if (!R.isEmpty(journals) && !R.isNil(journals)) {
      journalBalance += journals.reduce((amount, journal) => {
        switch (journal.type) {
          case TransactionType.CREDIT:
            amount -= Number(journal.amount);
            break;

          default:
            amount += Number(journal.amount);
        }

        return amount;
      }, 0);
    }

    if (R.isEmpty(account.children)) {
      return balance + journalBalance;
    } else {
      const childrenBalances = await Promise.all(account.children.map(async (acc: AccountWithChildrenBalance) => {
        const childBalance = await this.findBalanceForAllChildren(acc, Number(acc.startingDebit) - Number(acc.startingCredit));
        acc.balance = String(childBalance);
        return childBalance;
      }));

      entity.children = account.children.map(_account => {
        delete _account.children;
        return _account;
      });

      return balance + journalBalance + R.sum(childrenBalances);
    }
  }

  public async doGetMany(
    builder: SelectQueryBuilder<Account>,
    query: ParsedRequestParams,
    options: CrudRequestOptions,
  ) {
    if (this.decidePagination(query, options)) {
      const [data, total] = await builder.getManyAndCount();
      const limit = builder.expressionMap.take;
      const offset = builder.expressionMap.skip;

      const balance = await Promise.all(data.map((account) => this.findBalanceForAllChildren(account, Number(account.startingDebit) - Number(account.startingCredit))));

      data.forEach((account, idx) => {
        (account as any).balance = balance[idx];
        delete account.children;
      });

      return this.createPageInfo(data, total, limit || total, offset || 0);
    }

    const data = await builder.getMany();

    const balance = await Promise.all(data.map((account) => this.findBalanceForAllChildren(account, Number(account.startingDebit) - Number(account.startingCredit))));

    data.forEach((account, idx) => {
      (account as any).balance = balance[idx];
      delete account.children;
    });

    return data;
  }

  private async findRoots(req: CrudRequest) {
    const escapeAlias = (alias: string) => this.accountRepository.manager.connection.driver.escape(alias);
    const escapeColumn = (column: string) => this.accountRepository.manager.connection.driver.escape(column);
    const parentPropertyName = this.accountRepository.manager.connection.namingStrategy.joinColumnName(
      this.accountRepository.metadata.treeParentRelation!.propertyName, "id"
    );

    const builder = await this.createBuilder(req.parsed, req.options);
    builder.andWhere(`${escapeAlias(this.accountRepository.metadata.targetName)}.${escapeColumn(parentPropertyName)} IS NULL`);

    return this.doGetMany(builder, req.parsed, req.options);
  }

  async findAll(req: CrudRequest) {
    const builder = await this.createBuilder(req.parsed, req.options);

    return this.doGetMany(builder, req.parsed, req.options);
  }

  async findParents(req: CrudRequest) {
    return await this.findRoots(req);
  }

  async findOneAccount(req: CrudRequest): Promise<AccountWithChildrenBalance> {
    const account = await this.accountRepository.findOne(req.parsed.paramsFilter[0].value);

    if (!account) {
      throw new NotFoundException('Account not found!');
    }

    const balance = await this.findBalanceForAllChildren(account, Number(account.startingDebit) - Number(account.startingCredit));
    return Object.assign({}, account, { balance: String(balance) }) as AccountWithChildrenBalance;
  }

  async getAllAccounts(
    req: CrudRequest
  ): Promise<Array<Account & { balance: string }>> {
    const rawAccounts = await this.accountRepository
      .createQueryBuilder('accounts')
      .leftJoinAndSelect('accounts.journals', 'journal')
      .offset(req.parsed.offset)
      .limit(req.parsed.limit)
      .getMany();

    const accounts = rawAccounts.map(account => {
      let balance = 0;
      if (R.not(R.or(R.isNil, R.isEmpty)(account.journals))) {
        balance = account.journals.reduce((amount, journal) => {
          switch (journal.type) {
            case TransactionType.CREDIT:
              amount -= journal.amount;
              break;

            default:
              amount += journal.amount;
          }

          return amount;
        }, 0);
      }

      return {
        ...account,
        balance: String(Number(balance)),
      } as Account & { balance: string };
    });

    return accounts;
  }

  // @Transactional()
  // async updateAccount(req: CrudRequest, dto: Account) {
  //   const account = await this.updateOne(req, dto);
  //   const parents = await this.repository.manager
  //     .getTreeRepository(Account)
  //     .findAncestors(account);

  //   console.log(account, parent);

  //   if (parent.length > 0) {
  //     Promise.all(parents.map(parent => {
  //       return this.repository.manager
  //         .createQueryBuilder()
  //         .delete()
  //         .from('accounting-accounts_closure')
  //         .where('"id_descendant" = :id and "id_ancestor" = :id_parent', {
  //           id_parent: parent.id,
  //           id: account.id,
  //         })
  //         .execute();
  //     }));
  //   } else {
  //     await this.repository.manager
  //       .createQueryBuilder()
  //       .update('accounting-accounts_closure')
  //       .set({ id_ancestor: parent.id } as any)
  //       .where('"id_descendant" = :id', { id: account.id })
  //       .execute();
  //   }

  //   return account;
  // }
}

import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CrudRequest } from '@nestjsx/crud';
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';

import { Repository } from 'typeorm';

import * as R from 'ramda';

import { TransactionType } from '@/accounting/journals/journal.interface';

import { Account } from './account.entity';

@Injectable()
export class AccountsService extends TypeOrmCrudService<Account> {
  constructor(
    @InjectRepository(Account) private readonly repository : Repository<Account>,
  ) {
    super(repository);
  }

  async findAllAccounts() : Promise<Account[]> {
    return await this.repository.manager.getTreeRepository(Account).findTrees();
    // return await this.repository.find();
  }

  async getAllAccounts(
    req : CrudRequest,
  ) : Promise<Array<Account & { balance : string }>> {
    const rawAccounts = await this.repository
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
      } as Account & { balance : string };
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

import { Module } from '@nestjs/common';

import { LedgersModule } from './ledgers/ledgers.module';
import { AccountsModule } from './accounts/accounts.module';
import { TransactionsModule } from './transactions/transactions.module';
import { JournalsModule } from './journals/journals.module';

@Module({
  imports: [LedgersModule, AccountsModule, TransactionsModule, JournalsModule],
  exports: [LedgersModule, AccountsModule, TransactionsModule, JournalsModule],
})
export class AccountingModule {}

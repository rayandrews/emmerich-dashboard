import { Module } from '@nestjs/common';
import { AccountsModule } from './accounts/accounts.module';
import { TransactionsModule } from './transactions/transactions.module';
import { JournalsModule } from './journals/journals.module';

@Module({
  imports: [AccountsModule, TransactionsModule, JournalsModule],
  exports: [AccountsModule, TransactionsModule, JournalsModule],
})
export class AccountingModule {}

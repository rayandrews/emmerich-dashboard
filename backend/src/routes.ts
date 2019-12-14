import { Routes as IRoutes } from 'nest-router';

// Shared Module
import { SharedModule } from '@/shared/shared.module';
import { AuthModule } from '@/shared/auth/auth.module';

// User Module
import { UsersModule } from '@/users/users.module';

// Accounting Module
import { AccountingModule } from '@/accounting/accounting.module';
import { AccountsModule } from '@/accounting/accounts/accounts.module';
import { TransactionsModule } from '@/accounting/transactions/transactions.module';
import { JournalsModule } from '@/accounting/journals/journals.module';

export const routes: IRoutes = [
  {
    path: '/',
    module: SharedModule,
  },
  {
    path: '/users',
    module: UsersModule,
  },
  {
    path: '/accounting',
    module: AccountingModule,
    children: [
      { path: '/accounts', module: AccountsModule },
      { path: '/transactions', module: TransactionsModule },
      { path: '/journals', module: JournalsModule },
    ],
  },
];

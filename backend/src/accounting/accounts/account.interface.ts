import { Account } from './account.entity';

export class AccountWithChildrenBalance extends Account {
  balance: string;
  children: AccountWithChildrenBalance[];
}

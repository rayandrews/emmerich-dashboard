import { ApiProperty } from '@nestjs/swagger';
import { Dinero, Currency } from 'dinero.js';

import { Account } from '@/accounting/accounts/account.entity';

export enum TransactionType {
  DEBIT = 'debit',
  CREDIT = 'credit',
}

export class JournalItemPayload {
  @ApiProperty()
  readonly account: number;

  @ApiProperty()
  readonly memo: string;

  @ApiProperty()
  readonly currency: string;

  @ApiProperty()
  readonly amount: number;

  @ApiProperty({ enum: ['credit', 'debit'] })
  readonly type: TransactionType;
}

export interface TempJournalItem {
  readonly account: number;
  readonly memo: string;
  readonly currency: Currency;
  readonly amount: Dinero;
  readonly type: TransactionType;
  // readonly credit?: Dinero;
  // readonly debit?: Dinero;
}

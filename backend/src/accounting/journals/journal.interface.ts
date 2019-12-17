import { ApiModelProperty } from '@nestjs/swagger';
import { Dinero, Currency } from 'dinero.js';

import { Account } from '@/accounting/accounts/account.entity';

export enum TransactionType {
  DEBIT = 'debit',
  CREDIT = 'credit',
}

export class JournalItemPayload {
  @ApiModelProperty()
  readonly account: number;

  @ApiModelProperty()
  readonly memo: string;

  @ApiModelProperty()
  readonly currency: string;

  @ApiModelProperty()
  readonly amount: number;

  @ApiModelProperty({ enum: ['credit', 'debit'] })
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

import { ApiModelProperty } from '@nestjs/swagger';
import { Dinero, Currency } from 'dinero.js';

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
  readonly currency: Currency;

  @ApiModelProperty()
  readonly amount: number;

  @ApiModelProperty({ enum: ['credit', 'debit'] })
  readonly type: TransactionType;

  // @ApiModelProperty()
  // readonly credit: number;

  // @ApiModelProperty()
  // readonly debit: number;
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

import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Account } from '@/accounting/accounts/account.entity';
import { Transaction } from '@/accounting/transactions/transaction.entity';

import { Journal } from './journal.entity';
import { JournalsService } from './journals.service';
import { JournalsController } from './journals.controller';

@Module({
  imports: [
    TypeOrmModule.forFeature([Journal]),
    TypeOrmModule.forFeature([Transaction]),
    TypeOrmModule.forFeature([Account]),
  ],
  providers: [JournalsService],
  controllers: [JournalsController],
  exports: [JournalsService],
})
export class JournalsModule {}

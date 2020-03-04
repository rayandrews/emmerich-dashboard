import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Journal } from '@/accounting/journals/journal.entity';

import { Account } from './account.entity';
import { AccountsService } from './accounts.service';
import { AccountsController } from './accounts.controller';
import { AccountSubscriber } from './account.subscriber';

@Module({
  imports: [
    TypeOrmModule.forFeature([Journal]),
    TypeOrmModule.forFeature([Account]),
  ],
  providers: [AccountsService, AccountSubscriber],
  controllers: [AccountsController],
  exports: [AccountsService, AccountSubscriber],
})
export class AccountsModule { }

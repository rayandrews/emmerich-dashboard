import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Journal } from './journal.entity';
import { JournalsService } from './journals.service';
import { JournalSubscriber } from './journal.subscriber';

@Module({
  imports: [
    TypeOrmModule.forFeature([Journal]),
  ],
  providers: [JournalsService, JournalSubscriber],
  exports: [JournalsService, JournalSubscriber],
})
export class JournalsModule { }

import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Journal } from './journal.entity';
import { JournalsService } from './journals.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Journal]),
  ],
  providers: [JournalsService],
  exports: [JournalsService],
})
export class JournalsModule { }

import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Ledger } from './ledger.entity';
import { LedgersService } from './ledgers.service';
import { LedgersController } from './ledgers.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Ledger])],
  providers: [LedgersService],
  controllers: [LedgersController],
  exports: [LedgersService],
})
export class LedgersModule {}

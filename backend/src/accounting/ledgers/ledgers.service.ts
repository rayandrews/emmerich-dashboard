import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';

import { Repository } from 'typeorm';

import { Ledger } from './ledger.entity';

@Injectable()
export class LedgersService extends TypeOrmCrudService<Ledger> {
  constructor(
    @InjectRepository(Ledger) private readonly repository: Repository<Ledger>,
  ) {
    super(repository);
  }
}

import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';

import { Repository } from 'typeorm';

import { Journal } from './journal.entity';
@Injectable()
export class JournalsService extends TypeOrmCrudService<Journal> {
  constructor(
    @InjectRepository(Journal)
    journalRepository: Repository<Journal>,
  ) {
    super(journalRepository);
  }
}

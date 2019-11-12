import { Controller, Body, Post, Get, UseGuards } from '@nestjs/common';
import {
  Crud,
  CrudController,
  Override,
  ParsedRequest,
  CrudRequest,
  ParsedBody,
} from '@nestjsx/crud';
import { AuthGuard } from '@nestjs/passport';
import { ApiUseTags } from '@nestjs/swagger';

import { Journal } from './journal.entity';
import { JournalsService } from './journals.service';
import { JournalItemPayload } from './journal.interface';

@Crud({
  model: {
    type: Journal,
  },
  routes: {
    exclude: ['getManyBase', 'createOneBase', 'createManyBase'],
  },
})
@ApiUseTags('journals')
@Controller()
export class JournalsController implements CrudController<Journal> {
  constructor(public readonly service: JournalsService) {}

  private get base(): CrudController<Journal> {
    return this;
  }

  @UseGuards(AuthGuard('jwt'))
  @Override('getManyBase')
  @Get()
  async getJournalsByTransactionId(@ParsedRequest() req: CrudRequest) {
    return await this.service.getJournalsUsingTransactionId(req);
  }

  @UseGuards(AuthGuard('jwt'))
  @Override('createOneBase')
  @Post()
  async create(@Body() journalItems: JournalItemPayload[]) {
    return await this.service.addJournalEntry(journalItems);
  }

  @UseGuards(AuthGuard('jwt'))
  @Override('getOneBase')
  getOne(@ParsedRequest() req: CrudRequest) {
    return this.base.getOneBase(req);
  }

  @UseGuards(AuthGuard('jwt'))
  @Override('updateOneBase')
  updateOne(@ParsedRequest() req: CrudRequest, @ParsedBody() dto: Journal) {
    return this.base.updateOneBase(req, dto);
  }

  @UseGuards(AuthGuard('jwt'))
  @Override('replaceOneBase')
  replaceOne(@ParsedRequest() req: CrudRequest, @ParsedBody() dto: Journal) {
    return this.base.replaceOneBase(req, dto);
  }

  @UseGuards(AuthGuard('jwt'))
  @Override('deleteOneBase')
  async deleteOne(@ParsedRequest() req: CrudRequest) {
    return this.base.deleteOneBase(req);
  }
}

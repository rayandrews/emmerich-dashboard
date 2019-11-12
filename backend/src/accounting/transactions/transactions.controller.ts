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

import { Transaction } from './transaction.entity';

import { TransactionsService } from './transactions.service';

@Crud({
  model: {
    type: Transaction,
  },
  routes: {
    exclude: ['createOneBase', 'createManyBase'],
  },
  query: {
    join: {
      journals: {
        eager: true,
        persist: ['id'],
      },
    },
  },
})
@ApiUseTags('journals')
@Controller()
export class TransactionsController implements CrudController<Transaction> {
  constructor(public readonly service: TransactionsService) {}

  private get base(): CrudController<Transaction> {
    return this;
  }

  @UseGuards(AuthGuard('jwt'))
  @Override('getManyBase')
  @Get()
  getMany(@ParsedRequest() req: CrudRequest) {
    return this.base.getManyBase(req);
  }

  @UseGuards(AuthGuard('jwt'))
  @Override('getOneBase')
  getOne(@ParsedRequest() req: CrudRequest) {
    return this.base.getOneBase(req);
  }

  @UseGuards(AuthGuard('jwt'))
  @Override('updateOneBase')
  updateOne(@ParsedRequest() req: CrudRequest, @ParsedBody() dto: Transaction) {
    return this.base.updateOneBase(req, dto);
  }

  @UseGuards(AuthGuard('jwt'))
  @Override('replaceOneBase')
  replaceOne(
    @ParsedRequest() req: CrudRequest,
    @ParsedBody() dto: Transaction,
  ) {
    return this.base.replaceOneBase(req, dto);
  }

  @UseGuards(AuthGuard('jwt'))
  @Override('deleteOneBase')
  async deleteOne(@ParsedRequest() req: CrudRequest) {
    return this.base.deleteOneBase(req);
  }
}

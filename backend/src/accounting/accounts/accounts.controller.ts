import { Controller, UseGuards, Get } from '@nestjs/common';
import {
  Crud,
  CrudController,
  Override,
  ParsedRequest,
  CrudRequest,
  ParsedBody,
} from '@nestjsx/crud';
import { AuthGuard } from '@nestjs/passport';

import { Account } from './account.entity';
import { AccountsService } from './accounts.service';

@Crud({
  model: {
    type: Account,
  },
  query: {
    join: {
      parent: {
        eager: true,
        persist: ['id'],
      },
    },
    sort: [
      {
        field: 'createdAt',
        order: 'ASC',
      },
    ],
  },
  routes: {
    exclude: ['createManyBase'],
  },
})
@Controller()
export class AccountsController implements CrudController<Account> {
  constructor(public readonly service: AccountsService) {}

  get base(): CrudController<Account> {
    return this;
  }

  @UseGuards(AuthGuard('jwt'))
  @Override('getManyBase')
  getMany(@ParsedRequest() req: CrudRequest) {
    return this.service.getAllAccounts(req);
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('/tree')
  getTrees(@ParsedRequest() req: CrudRequest) {
    return this.service.findAllAccounts();
  }

  @UseGuards(AuthGuard('jwt'))
  @Override('createOneBase')
  createOne(@ParsedRequest() req: CrudRequest, @ParsedBody() dto: Account) {
    return this.base.createOneBase(req, dto);
  }

  @UseGuards(AuthGuard('jwt'))
  @Override('getOneBase')
  getOne(@ParsedRequest() req: CrudRequest) {
    return this.base.getOneBase(req);
  }

  @UseGuards(AuthGuard('jwt'))
  @Override('updateOneBase')
  updateOne(@ParsedRequest() req: CrudRequest, @ParsedBody() dto: Account) {
    return this.base.updateOneBase(req, dto);
  }

  @UseGuards(AuthGuard('jwt'))
  @Override('replaceOneBase')
  replaceOne(@ParsedRequest() req: CrudRequest, @ParsedBody() dto: Account) {
    return this.base.replaceOneBase(req, dto);
  }

  @UseGuards(AuthGuard('jwt'))
  @Override('deleteOneBase')
  async deleteOne(@ParsedRequest() req: CrudRequest) {
    return this.base.deleteOneBase(req);
  }
}

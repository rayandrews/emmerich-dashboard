import { Injectable } from '@nestjs/common';
import { InjectConnection } from '@nestjs/typeorm';
import {
  Connection,
  EntitySubscriberInterface,
} from 'typeorm';
import { LoadEvent } from 'typeorm/subscriber/event/LoadEvent';

import { Account } from './account.entity';

@Injectable()
export class AccountSubscriber implements EntitySubscriberInterface {
  constructor(
    @InjectConnection() private readonly connection: Connection,
  ) {
    connection.subscribers.push(this);
  }

  listenTo() {
    return Account;
  }
}

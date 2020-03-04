import { Injectable } from '@nestjs/common';
import { InjectConnection } from '@nestjs/typeorm';
import { Connection, EntitySubscriberInterface, InsertEvent } from 'typeorm';

import { Journal } from './journal.entity';

@Injectable()
export class JournalSubscriber implements EntitySubscriberInterface {
  constructor(
    @InjectConnection() readonly connection: Connection,
  ) {
    connection.subscribers.push(this);
  }

  listenTo() {
    return Journal;
  }

  afterInsert(event: InsertEvent<Journal>) {
    // console.log(JSON.stringify(event.entity.account, null, 2));
  };
}

import { fork, all } from 'redux-saga/effects';

import * as ledgers from './ledgers';
import * as accounts from './accounts';
import * as journals from './journals';

export function* saga() {
  yield all([fork(ledgers.saga), fork(accounts.saga), fork(journals.saga)]);
}

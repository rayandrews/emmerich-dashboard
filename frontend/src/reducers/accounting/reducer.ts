import { combineReducers, Reducer } from 'redux';
import { StateType } from 'typesafe-actions';

import * as ledgers from './ledgers';
import * as accounts from './accounts';
import * as journals from './journals';

export const reducer: Reducer<
  {
    ledgers: ledgers.State;
    accounts: accounts.State;
    journals: journals.State;
  },
  ledgers.Action | accounts.Action | journals.Action
> = combineReducers({
  ledgers: ledgers.reducer,
  accounts: accounts.reducer,
  journals: journals.reducer,
});

export type State = StateType<typeof reducer>;

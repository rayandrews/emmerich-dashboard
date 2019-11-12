import { createSelector } from 'reselect';
import * as R from 'ramda';

import { State } from './types';

export const getCsrfToken = createSelector(
  R.path<State['csrfToken']>(['csrfToken']),
  R.identity,
);

export const isSidebarOpen = createSelector(
  R.path<State['sidebarOpen']>(['sidebarOpen']),
  R.identity,
);

export const getNotifications = createSelector(
  R.path<State['notifications']>(['notifications']),
  R.identity,
);

// export const getNotifications = createSelector<
//   State,
//   State['notifications'] | undefined,
//   State['notifications'] | undefined
// >(
//   R.path<State['notifications']>(['notifications']),
//   R.identity,
// );

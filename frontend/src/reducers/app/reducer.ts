import { createReducer, ActionType } from 'typesafe-actions';

import produce, { Draft } from 'immer';

import { State } from './types';

import * as actions from './actions';

export type Action = ActionType<typeof actions>;

export const initialState: State = {
  theme: 'light',
  csrfToken: null,
  notifications: [],
  sidebarOpen: false,
};

export const reducer = createReducer<State, Action>(initialState)
  .handleAction(
    actions.changeTheme,
    produce(
      (state: Draft<State>, action: ActionType<typeof actions.changeTheme>) => {
        state.theme = action.payload;
      },
    ),
  )
  .handleAction(
    actions.openSidebar,
    produce(
      (state: Draft<State>, action: ActionType<typeof actions.openSidebar>) => {
        state.sidebarOpen = true;
      },
    ),
  )
  .handleAction(
    actions.closeSidebar,
    produce(
      (
        state: Draft<State>,
        action: ActionType<typeof actions.closeSidebar>,
      ) => {
        state.sidebarOpen = false;
      },
    ),
  )
  .handleAction(
    actions.fetchCsrfAction.success,
    produce(
      (
        state: Draft<State>,
        action: ActionType<typeof actions.fetchCsrfAction.success>,
      ) => {
        state.csrfToken = action.payload.token;
      },
    ),
  )
  .handleAction(
    actions.addNotification,
    produce(
      (
        state: Draft<State>,
        action: ActionType<typeof actions.addNotification>,
      ) => {
        state.notifications.push(action.payload);
      },
    ),
  )
  .handleAction(
    actions.removeNotification,
    produce(
      (
        state: Draft<State>,
        action: ActionType<typeof actions.removeNotification>,
      ) => {
        state.notifications.splice(
          state.notifications.findIndex(
            notification => notification.uid === action.payload,
          ),
          1,
        );
      },
    ),
  )
  .handleAction(
    actions.removeAllNotifications,
    produce((state: Draft<State>) => {
      state.notifications.splice(0, state.notifications.length);
    }),
  );

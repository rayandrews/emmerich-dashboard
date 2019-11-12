import { createAction, createAsyncAction } from 'typesafe-actions';

import nanoid from 'nanoid';

import * as constants from './constants';

import { CsrfResponse, Notification } from './types';

export const changeTheme = createAction(
  constants.CHANGE_THEME,
  (theme: string) => theme,
)();

export const openSidebar = createAction(constants.OPEN_SIDEBAR)();

export const closeSidebar = createAction(constants.CLOSE_SIDEBAR)();

export const fetchCsrfAction = createAsyncAction(
  constants.FETCH_CSRF_REQUEST,
  constants.FETCH_CSRF_SUCCESS,
  constants.FETCH_CSRF_FAILURE,
)<undefined, CsrfResponse, Error>();

export const addNotification = createAction(
  constants.ADD_NOTIFICATION,
  (_notification: Notification) => {
    const notification = {
      ..._notification,
      uid: nanoid(),
    };

    return notification;
  },
)();

export const removeNotification = createAction(
  constants.REMOVE_NOTIFICATION,
  (id: string) => id,
)();

export const removeAllNotifications = createAction(
  constants.REMOVE_ALL_NOTIFICATIONS,
)();

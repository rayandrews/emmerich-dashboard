import { createAction, createAsyncAction } from 'typesafe-actions';

import * as constants from './constants';

import { ILoginPayload, ILoginResponse, ICheckProfileResponse } from './types';

// 1. Login
export const loginAction = createAsyncAction(
  constants.USER_LOGIN_REQUEST,
  constants.USER_LOGIN_SUCCESS,
  constants.USER_LOGIN_FAILURE,
)<ILoginPayload, ILoginResponse, Error>();

// 2. Logout
export const logoutAction = createAction(constants.USER_LOGOUT)();

// 3. Check Profile
export const checkProfileAction = createAsyncAction(
  constants.CHECK_PROFILE_REQUEST,
  constants.CHECK_PROFILE_SUCCESS,
  constants.CHECK_PROFILE_FAILURE,
)<undefined, ICheckProfileResponse, Error>();

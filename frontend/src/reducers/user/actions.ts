import { createAsyncAction } from 'typesafe-actions';

import * as constants from './constants';

import {
  ICreateUserPayload,
  ICreateUserResponse,
  ICreateUserWithLoginResponse,
} from './types';

export const createUserAction = createAsyncAction(
  constants.CREATE_REQUEST,
  constants.CREATE_SUCCESS,
  constants.CREATE_FAILURE,
)<ICreateUserPayload, ICreateUserResponse, Error>();

export const createUserWithLoginAction = createAsyncAction(
  constants.CREATE_WITH_LOGIN_REQUEST,
  constants.CREATE_WITH_LOGIN_SUCCESS,
  constants.CREATE_WITH_LOGIN_FAILURE,
)<ICreateUserPayload, ICreateUserWithLoginResponse, Error>();

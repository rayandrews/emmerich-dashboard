import { createAsyncAction } from 'typesafe-actions';

import * as constants from './constants';
import {
  IListAccountResponse,
  ICreateAccountPayload,
  ICreateAccountState,
} from './types';

export const getAccountsAction = createAsyncAction(
  constants.GET_ACCOUNTS_REQUEST,
  constants.GET_ACCOUNTS_SUCCESS,
  constants.GET_ACCOUNTS_FAILURE,
)<[undefined, string], IListAccountResponse, Error>();

export const createAccountAction = createAsyncAction(
  constants.CREATE_ACCOUNT_REQUEST,
  constants.CREATE_ACCOUNT_SUCCESS,
  constants.CREATE_ACCOUNT_FAILURE,
)<ICreateAccountPayload, ICreateAccountState, Error>();

export const updateAccountAction = createAsyncAction(
  constants.UPDATE_ACCOUNT_REQUEST,
  constants.UPDATE_ACCOUNT_SUCCESS,
  constants.UPDATE_ACCOUNT_FAILURE,
)<ICreateAccountPayload, ICreateAccountState, Error>();

export const deleteAccountAction = createAsyncAction(
  constants.CREATE_ACCOUNT_REQUEST,
  constants.CREATE_ACCOUNT_SUCCESS,
  constants.CREATE_ACCOUNT_FAILURE,
)<undefined, any, Error>();

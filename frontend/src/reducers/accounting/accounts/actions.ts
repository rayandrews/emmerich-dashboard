import { createAsyncAction } from 'typesafe-actions';

import { createAsyncPaginationAction } from '@/utils/actions/async';

import * as constants from './constants';
import {
  IListAccountResponse,
  ICreateAccountPayload,
  ICreateAccountState,
  Account,
} from './types';

export const getAccountsAction = createAsyncPaginationAction<
  undefined,
  IListAccountResponse
>(
  constants.GET_ACCOUNTS_REQUEST,
  constants.GET_ACCOUNTS_SUCCESS,
  constants.GET_ACCOUNTS_FAILURE,
);

export const getSpecificAccountAction = createAsyncAction(
  constants.GET_SPECIFIC_ACCOUNT_REQUEST,
  constants.GET_SPECIFIC_ACCOUNT_SUCCESS,
  constants.GET_SPECIFIC_ACCOUNT_FAILURE,
)<[undefined, string], Account, Error>();

export const createAccountAction = createAsyncAction(
  constants.CREATE_ACCOUNT_REQUEST,
  constants.CREATE_ACCOUNT_SUCCESS,
  constants.CREATE_ACCOUNT_FAILURE,
)<ICreateAccountPayload, ICreateAccountState, Error>();

export const updateAccountAction = createAsyncAction(
  constants.UPDATE_ACCOUNT_REQUEST,
  constants.UPDATE_ACCOUNT_SUCCESS,
  constants.UPDATE_ACCOUNT_FAILURE,
)<[ICreateAccountPayload, string], ICreateAccountState, Error>();

export const deleteAccountAction = createAsyncAction(
  constants.DELETE_ACCOUNT_REQUEST,
  constants.DELETE_ACCOUNT_SUCCESS,
  constants.DELETE_ACCOUNT_FAILURE,
)<[undefined, string], any, Error>();

import { createAsyncAction } from 'typesafe-actions';

import * as constants from './constants';
import {
  IListLedgerResponse,
  ICreateLedgerPayload,
  ICreateLedgerResponse,
  IUpdateLedgerPayload,
  IUpdateLedgerResponse,
} from './types';

export const getLedgersAction = createAsyncAction(
  constants.GET_LEDGERS_REQUEST,
  constants.GET_LEDGERS_SUCCESS,
  constants.GET_LEDGERS_FAILURE,
)<undefined, IListLedgerResponse, Error>();

export const createLedgerAction = createAsyncAction(
  constants.CREATE_LEDGER_REQUEST,
  constants.CREATE_LEDGER_SUCCESS,
  constants.CREATE_LEDGER_FAILURE,
)<ICreateLedgerPayload, ICreateLedgerResponse, Error>();

export const updateLedgerAction = createAsyncAction(
  constants.UPDATE_LEDGER_REQUEST,
  constants.UPDATE_LEDGER_SUCCESS,
  constants.UPDATE_LEDGER_FAILURE,
)<IUpdateLedgerPayload, IUpdateLedgerResponse, Error>();

// export const deleteLedgerAction = createAsyncAction(
//   constants.DELETE_LEDGER_REQUEST,
//   constants.DELETE_LEDGER_SUCCESS,
//   constants.DELETE_LEDGER_FAILURE,
// )<undefined, any, Error>();

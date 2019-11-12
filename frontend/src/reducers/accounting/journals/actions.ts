import { createAsyncAction } from 'typesafe-actions';

import { createAsyncPaginationAction } from '@/utils/actions/async';

import * as constants from './constants';
import {
  IListJournalResponse,
  ICreateJournalPayloadArray,
  ICreateJournalResponse,
  IUpdateJournalResponse,
} from './types';

export const getJournalsAction = createAsyncPaginationAction<
  undefined,
  IListJournalResponse
>(
  constants.GET_JOURNALS_REQUEST,
  constants.GET_JOURNALS_SUCCESS,
  constants.GET_JOURNALS_FAILURE,
);

export const createJournalAction = createAsyncAction(
  constants.CREATE_JOURNAL_REQUEST,
  constants.CREATE_JOURNAL_SUCCESS,
  constants.CREATE_JOURNAL_FAILURE,
)<ICreateJournalPayloadArray, ICreateJournalResponse, Error>();

export const updateJournalAction = createAsyncAction(
  constants.CREATE_JOURNAL_REQUEST,
  constants.CREATE_JOURNAL_SUCCESS,
  constants.CREATE_JOURNAL_FAILURE,
)<ICreateJournalPayloadArray, IUpdateJournalResponse, Error>();

// export const deleteJournalAction = createAsyncAction(
//   constants.CREATE_JOURNAL_REQUEST,
//   constants.CREATE_JOURNAL_SUCCESS,
//   constants.CREATE_JOURNAL_FAILURE,
// )<ICreateJournalPayloadArray, IUpdateJournalResponse, Error>();

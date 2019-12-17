import { createAsyncAction } from 'typesafe-actions';

import { createAsyncPaginationAction } from '@/utils/actions/async';

import * as constants from './constants';
import {
  IListJournalResponse,
  ICreateJournalPayloadArray,
  ICreateJournalResponse,
  IUpdateJournalResponse,
  Transaction,
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
  constants.UPDATE_JOURNAL_REQUEST,
  constants.UPDATE_JOURNAL_SUCCESS,
  constants.UPDATE_JOURNAL_FAILURE,
)<[Partial<Transaction>, string], IUpdateJournalResponse, Error>();

export const deleteJournalAction = createAsyncAction(
  constants.DELETE_JOURNAL_REQUEST,
  constants.DELETE_JOURNAL_SUCCESS,
  constants.DELETE_JOURNAL_FAILURE,
)<[undefined, string], IUpdateJournalResponse, Error>();

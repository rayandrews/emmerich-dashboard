import * as Yup from 'yup';

import { LedgerTypeArray } from '@/reducers/accounting/ledgers';

export const createLedgerValidation = Yup.object().shape({
  name: Yup.string().required(),
  type: Yup.string().oneOf(LedgerTypeArray),
});

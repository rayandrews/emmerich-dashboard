import * as Yup from 'yup';

import { AccountType } from '@/reducers/accounting/accounts';

export const createAccountValidation = Yup.object().shape({
  name: Yup.string().required(),
  type: Yup.string()
    .oneOf(Object.values(AccountType))
    .required(),
  startingDebit: Yup.number().required(),
  startingCredit: Yup.number().required(),
  parent: Yup.string().nullable(),
});

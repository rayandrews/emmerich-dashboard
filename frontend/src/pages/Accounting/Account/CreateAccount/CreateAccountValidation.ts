import * as Yup from 'yup';

export const createAccountValidation = Yup.object().shape({
  name: Yup.string().required(),
  ledger: Yup.number().required(),
  startingBalance: Yup.number().required(),
  parent: Yup.string().nullable(),
});

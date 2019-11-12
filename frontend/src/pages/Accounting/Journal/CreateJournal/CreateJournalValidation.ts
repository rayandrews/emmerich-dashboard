import * as Yup from 'yup';

import * as R from 'ramda';

interface IJournalPayload {
  account: number;
  currency: string;
  credit: number;
  debit: number;
  type: string;
}

interface FormPayload {
  entries: IJournalPayload[];
}

export const createJournalValidation = Yup.object()
  .shape({
    entries: Yup.array().of(
      Yup.object()
        .shape(
          {
            account: Yup.number(),
            currency: Yup.string(),
            // amount: Yup.number(),
            credit: Yup.number().when('debit', {
              is: (debit: number) => {
                return R.or(R.isNil(debit), R.isEmpty(debit));
              },
              then: Yup.number()
                .required()
                .moreThan(0),
              otherwise: Yup.number(),
            }),
            debit: Yup.number().when('credit', {
              is: (credit: number) => {
                return R.or(R.isNil(credit), R.isEmpty(credit));
              },
              then: Yup.number()
                .required()
                .moreThan(0),
              otherwise: Yup.number(),
            }),
            type: Yup.string(),
          },
          [['credit', 'debit']],
        )
        .test({
          name: 'one-must-zero',
          message: '',
          exclusive: true,
          test: function(value: IJournalPayload) {
            if (!value) return true;

            const { credit, debit } = value;

            let valid = false;

            if (credit !== 0 && debit === 0) {
              valid = true;
            } else if (credit === 0 && debit !== 0) {
              valid = true;
            }

            return (
              valid ||
              this.createError({
                // path: 'sums.all',
                message: 'One of them must be zero!',
              })
            );
          },
        }),
    ),
  })
  .test({
    name: 'sums',
    message: '',
    exclusive: true,
    test: function(value: FormPayload) {
      if (!value) return true;

      const { entries } = value;

      const [credit, debit] = entries.reduce(
        ([_credit, _debit], value) => {
          _credit += value.debit;
          _debit += value.credit;
          return [_credit, _debit];
        },
        [0, 0],
      );

      return (
        credit === debit ||
        this.createError({
          path: 'general',
          message: 'Debit and Credit must have same value!',
        })
      );
    },
  });

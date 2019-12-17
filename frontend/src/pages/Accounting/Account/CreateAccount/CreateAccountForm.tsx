import React from 'react';

import * as R from 'ramda';

import { useDispatch, useSelector } from 'react-redux';

import useForm, { FormContext } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import { Button, Form } from 'reactstrap';

import { ApplicationState } from '@/reducers';
import { getListOfAccountsFromAccounting } from '@/reducers/accounting';

import {
  IListAccountsState,
  createAccountAction,
  AccountType,
} from '@/reducers/accounting/accounts';

import { capitalize } from '@/utils/string';

import { FormInput } from '@/components/Form';

import { createAccountValidation } from './CreateAccountValidation';

export interface CreateAccountFormProps {}

export const CreateAccountForm: React.FunctionComponent<CreateAccountFormProps> = ({
  children,
}) => {
  const dispatch = useDispatch();
  const { t } = useTranslation('accounting');

  const listAccountsFetched = useSelector((state: ApplicationState) =>
    getListOfAccountsFromAccounting(state.accounting),
  ) as IListAccountsState;

  const listAccounts = [{ id: '', name: 'No Parent' }, ...listAccountsFetched];

  const formContext = useForm({
    validationSchema: createAccountValidation,
    defaultValues: {
      parent: '',
    },
  });

  const watchParent = formContext.watch('parent', '' as any);

  const onSubmit = _data => {
    if (!_data) return;

    const { parent, ...rest } = _data;
    dispatch(
      createAccountAction.request({
        ...rest,
        parent: {
          id: R.isEmpty(parent) ? undefined : Number(parent),
        },
      }),
    );
    // dispatch(push('/'));
  };

  return (
    <FormContext {...formContext}>
      <Form onSubmit={formContext.handleSubmit(onSubmit)}>
        <FormInput
          name="name"
          type="text"
          label={t('account.create.name.label')}
          placeholder={t('account.create.name.placeholder')}
        />
        <FormInput
          name="startingDebit"
          type="number"
          label={t('account.create.startingDebit.label')}
          placeholder={t('account.create.startingDebit.placeholder')}
        />
        <FormInput
          name="startingCredit"
          type="number"
          label={t('account.create.startingCredit.label')}
          placeholder={t('account.create.startingCredit.placeholder')}
        />
        <FormInput
          name="type"
          type="select"
          label={t('account.create.type.label')}
          placeholder={t('account.create.type.placeholder')}
        >
          {Object.values(AccountType).map((accountType, idx) => (
            <option key={accountType} value={accountType}>
              {capitalize(accountType)}
            </option>
          ))}
        </FormInput>
        {/* <FormInput
          name="parent"
          type="number"
          label={t('account.create.parent.label')}
          placeholder={t('account.create.parent.placeholder')}
          defaultValue={watchParent}
        /> */}
        <FormInput
          type="select"
          name="parent"
          label={t('account.create.parent.label')}
          placeholder={t('account.create.parent.placeholder')}
          value={watchParent}
          // value={watchCurrency}
          // onChange={event =>
          //   formContext.setValue(
          //     'currency',
          //     event.target.value,
          //   )
          // }
        >
          {listAccounts.map(account => (
            <option key={`${account.id} - ${account.name}`} value={account.id}>
              {capitalize(account.name)}
            </option>
          ))}
        </FormInput>
        <hr />
        <Button
          size="lg"
          className="bg-gradient-theme-left border-0"
          block
          onClick={formContext.handleSubmit(onSubmit)}
        >
          Create Account
        </Button>
        {children}
      </Form>
    </FormContext>
  );
};

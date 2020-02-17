import React from 'react';

import { useDispatch } from 'react-redux';

import { useForm, FormContext } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import { Button, Form } from 'reactstrap';

import * as R from 'ramda';

import {
  Account,
  createAccountAction,
  AccountType,
  listAccountsService,
} from '@/reducers/accounting/accounts';

import { FormInput, AsyncSelect } from '@/components/Form';

import { useSearch } from '@/hooks/useSearch';

import { capitalize } from '@/utils/string';

import { createAccountValidation } from './CreateAccountValidation';

export interface CreateAccountFormProps {}

export const CreateAccountForm: React.FunctionComponent<CreateAccountFormProps> = ({
  children,
}) => {
  const dispatch = useDispatch();
  const { t } = useTranslation('accounting');

  const { setInputText, search } = useSearch({
    field: 'name',
    service: listAccountsService,
  });

  const formContext = useForm({
    validationSchema: createAccountValidation,
    defaultValues: {
      parent: '',
    },
  });

  const onParentChange = (newValue, actionMeta) => {
    formContext.setValue('parent', newValue.value);
  };

  const onSubmit = _data => {
    if (!_data) return;

    const { parent, ...rest } = _data;
    dispatch(
      createAccountAction.request({
        ...rest,
        parent: {
          id: R.isEmpty(parent) ? null : Number(parent),
        },
      }),
    );
  };

  const defaultAccountEntry = { value: '', label: 'No Parent' };

  const searchAccount = (inputValue: string) => {
    setInputText(inputValue);

    return new Promise(resolve => {
      if (R.is(Array, search.result)) {
        resolve([
          defaultAccountEntry,
          ...(search.result as Account[]).map(account => ({
            value: String(account.id),
            label: account.name,
          })),
        ]);
      } else {
        resolve([defaultAccountEntry]);
      }
    });
  };

  return (
    <FormContext {...formContext}>
      <Form onSubmit={formContext.handleSubmit(onSubmit)}>
        <FormInput
          name="name"
          type="text"
          label={t('account.name.label')}
          placeholder={t('account.name.placeholder')}
        />
        <FormInput
          name="startingDebit"
          type="number"
          label={t('account.startingDebit.label')}
          placeholder={t('account.startingDebit.placeholder')}
        />
        <FormInput
          name="startingCredit"
          type="number"
          label={t('account.startingCredit.label')}
          placeholder={t('account.startingCredit.placeholder')}
        />
        <FormInput
          name="type"
          type="select"
          label={t('account.type.label')}
          placeholder={t('account.type.placeholder')}
        >
          {Object.values(AccountType).map((accountType, idx) => (
            <option key={accountType} value={accountType}>
              {capitalize(accountType)}
            </option>
          ))}
        </FormInput>
        <AsyncSelect
          name="parent"
          className="basic-single"
          classNamePrefix="select"
          label={t('account.parent.label')}
          placeholder={t('account.parent.placeholder')}
          onChange={onParentChange}
          isSearchable
          isLoading={search.loading}
          loadOptions={searchAccount}
          cacheOptions
          defaultOptions
          onInputChange={setInputText}
        />
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

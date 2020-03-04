import React from 'react';

import { useDispatch } from 'react-redux';

import { useForm, FormContext } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import { Button, Form } from 'reactstrap';

import {
  LedgerTypeArray,
  createLedgerAction,
} from '@/reducers/accounting/ledgers';

import { FormInput } from '@/components/Form';

import { capitalize } from '@/utils/string';

import { createLedgerValidation } from './CreateLedgerValidation';

export interface CreateLedgerFormProps {}

export const CreateLedgerForm: React.FunctionComponent<CreateLedgerFormProps> = () => {
  const dispatch = useDispatch();
  const { t } = useTranslation('accounting');

  const formContext = useForm({
    validationSchema: createLedgerValidation,
  });

  const onSubmit = data => {
    if (!data) return;
    dispatch(createLedgerAction.request(data));
  };

  return (
    <FormContext {...formContext}>
      <Form onSubmit={formContext.handleSubmit(onSubmit)}>
        <FormInput
          name="name"
          type="text"
          label={t('ledger.create.name.label')}
          placeholder={t('ledger.create.name.placeholder')}
        />
        <FormInput
          name="type"
          type="select"
          label={t('ledger.create.type.label')}
          placeholder={t('ledger.create.type.placeholder')}
        >
          {LedgerTypeArray.map(ledgerType => (
            <option key={ledgerType} value={ledgerType}>
              {capitalize(ledgerType)}
            </option>
          ))}
        </FormInput>
        <Button
          size="lg"
          className="float-right bg-gradient-theme-left border-0"
          block
          onClick={formContext.handleSubmit(onSubmit)}
          type="submit"
        >
          Submit
        </Button>
      </Form>
    </FormContext>
  );
};

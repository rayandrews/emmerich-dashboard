import React from 'react';

import * as R from 'ramda';

import { useDispatch } from 'react-redux';
import { push } from 'connected-react-router';

import { useForm, Controller, FormContext } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import {
  Alert,
  Button,
  Card,
  CardBody,
  CardHeader,
  CardFooter,
  Col,
  Form,
  Row,
  Table,
} from 'reactstrap';
import { MdClose } from 'react-icons/md';

import { default as siteConfig } from '@/config/site';
import * as routes from '@/config/routes';

import { FormInput, AsyncSelect } from '@/components/Form';

import { useSearch } from '@/hooks/useSearch';

import {
  createJournalAction,
  TransactionType,
} from '@/reducers/accounting/journals';
import { Account, listAccountsService } from '@/reducers/accounting/accounts';

import { createJournalValidation } from './CreateJournalValidation';

export interface CreateJournalFormProps {}

export const CreateJournalForm: React.FunctionComponent<CreateJournalFormProps> = ({
  children,
}) => {
  const dispatch = useDispatch();
  const { t } = useTranslation('accounting');

  const addMoreRef = React.useRef<HTMLButtonElement>(null);
  const [indexes, setIndexes] = React.useState<number[]>([0]);
  const [counter, setCounter] = React.useState(1);

  const creditRef = React.useRef<number>(0);
  const debitRef = React.useRef<number>(0);

  const { setInputText, search } = useSearch({
    field: 'name',
    service: listAccountsService,
  });

  const formContext = useForm({
    validationSchema: createJournalValidation,
    defaultValues: {
      entries: [],
    },
  });

  const watchEntries = formContext.watch('entries') as any[];

  const searchAccount = (inputValue: string) => {
    setInputText(inputValue);

    return new Promise(resolve => {
      if (R.is(Array, search.result)) {
        resolve(
          (search.result as Account[]).map(account => ({
            value: String(account.id),
            label: account.name,
          })),
        );
      } else {
        resolve([]);
      }
    });
  };

  const getAccountFromEntries = (index: number) => {
    if (!watchEntries || !watchEntries[index] || !watchEntries[index].account)
      return {};

    return watchEntries[index].account;
  };

  const onSubmit = (_data: any) => {
    if (R.or(R.isNil(_data.entries), R.isEmpty(_data.entries))) return;

    const data = _data.entries.map((entry: any) => ({
      account: Number(entry.account.value),
      currency: siteConfig.currency,
      amount: entry.debit !== 0 ? entry.debit : entry.credit,
      type: entry.debit !== 0 ? TransactionType.DEBIT : TransactionType.CREDIT,
      memo: entry.memo,
    }));

    dispatch(push(routes.accounting.journal.list));
    R.compose(dispatch, createJournalAction.request)(data);
  };

  const addEntry = () => {
    setIndexes(prevIndexes => [...prevIndexes, counter]);
    setCounter(prevCounter => prevCounter + 1);
  };

  const removeEntry = index => () => {
    setIndexes(prevIndexes => [...prevIndexes.filter(item => item !== index)]);
  };

  // const clearEntries = () => {
  //   setIndexes([]);
  // };

  React.useEffect(() => {
    if (!addMoreRef.current) {
      return;
    }

    addMoreRef.current.scrollIntoView({ behavior: 'smooth' });
  }, [addMoreRef, counter]);

  React.useEffect(() => {
    if (!watchEntries) return;

    if (counter === 0) {
      creditRef.current = 0;
      debitRef.current = 0;
      return;
    }

    [creditRef.current, debitRef.current] = watchEntries.reduce(
      ([credit, debit], entry: any) => {
        credit += Number(entry.credit);
        debit += Number(entry.debit);
        return [credit, debit];
      },
      [0, 0],
    );
  }, [watchEntries, counter]);

  return (
    // <Container>
    <FormContext {...formContext}>
      <Form onSubmit={formContext.handleSubmit(onSubmit)}>
        <Card className="my-4">
          <CardHeader className="justify-content-between">
            <Row className="align-items-center">
              <Col md={6}>
                <h4>Journal Entries</h4>
              </Col>
              <Col md={6} className="float-right">
                <h4 className="text-right">Currency: IDR</h4>
              </Col>
            </Row>
          </CardHeader>
          <CardBody>
            {formContext.errors['general'] ? (
              <Alert color="danger">
                {(formContext.errors['general'] as any).message}
              </Alert>
            ) : null}
            <Table responsive striped>
              <thead>
                <tr>
                  <th className="text-center" colSpan={2}>
                    {t('journal.account.label')}
                  </th>
                  <th>{t('journal.description.label')}</th>
                  <th className="text-center">{t('journal.debit.label')}</th>
                  <th className="text-center">{t('journal.credit.label')}</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {indexes.map(index => {
                  const fieldName = `entries[${index}]`;
                  return (
                    <React.Fragment key={fieldName}>
                      {formContext.errors[fieldName] ? (
                        <tr>
                          <td colSpan={6}>
                            <Alert color="danger" key={fieldName}>
                              [Entries no. {index + 1}] -{' '}
                              {(formContext.errors[fieldName] as any).message}
                            </Alert>
                          </td>
                        </tr>
                      ) : null}
                      <tr>
                        <td colSpan={2}>
                          <Controller
                            name={`${fieldName}.account`}
                            as={
                              <AsyncSelect
                                name={`${fieldName}.account-container`}
                                className="basic-single"
                                classNamePrefix="select"
                                // label={t('journal.account.label')}
                                placeholder={t('journal.account.placeholder')}
                                isSearchable
                                isLoading={search.loading}
                                loadOptions={searchAccount}
                                cacheOptions
                                defaultOptions
                                onInputChange={setInputText}
                                value={getAccountFromEntries(index)}
                              />
                            }
                            control={formContext.control}
                            rules={{ required: true }}
                            onChange={([selected]) => {
                              return { value: selected };
                            }}
                          />
                        </td>
                        <td>
                          <FormInput
                            type="text"
                            name={`${fieldName}.memo`}
                            placeholder={t('journal.description.placeholder')}
                          />
                        </td>
                        <td>
                          <FormInput
                            type="number"
                            name={`${fieldName}.debit`}
                            placeholder={t('journal.debit.placeholder')}
                          />
                        </td>
                        <td>
                          <FormInput
                            type="number"
                            name={`${fieldName}.credit`}
                            placeholder={t('journal.credit.placeholder')}
                          />
                        </td>
                        <td className="align-items-center">
                          <Button size="sm" onClick={removeEntry(index)}>
                            <MdClose size="0.75em" />
                          </Button>
                        </td>
                      </tr>
                    </React.Fragment>
                  );
                })}
                <tr>
                  <th>
                    <Button
                      size="md"
                      className="border-0"
                      block
                      onClick={addEntry}
                      innerRef={addMoreRef}
                    >
                      Add More
                    </Button>
                  </th>
                  <td className="text-right" colSpan={2}>
                    Total
                  </td>
                  <td>
                    <p className="float-left">{siteConfig.currency}</p>
                    <p className="float-right">{debitRef.current}</p>
                  </td>
                  <td>
                    <p className="float-left">{siteConfig.currency}</p>
                    <p className="float-right">{creditRef.current}</p>
                  </td>
                </tr>
              </tbody>
            </Table>
          </CardBody>
          <CardFooter>
            <Row>
              <Col md={12}>
                <Button
                  size="lg"
                  className="float-right bg-gradient-theme-left border-0"
                  block
                  onClick={formContext.handleSubmit(onSubmit)}
                  type="submit"
                >
                  Submit
                </Button>
              </Col>
            </Row>
          </CardFooter>
        </Card>
        {children}
      </Form>
    </FormContext>
    // </Container>
  );
};

CreateJournalForm.propTypes = {} as React.ValidationMap<CreateJournalFormProps>;

CreateJournalForm.defaultProps = {};

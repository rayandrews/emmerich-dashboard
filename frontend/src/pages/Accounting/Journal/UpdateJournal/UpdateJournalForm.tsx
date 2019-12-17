import React from 'react';

import * as R from 'ramda';

import { useDispatch, useSelector } from 'react-redux';
import { push } from 'connected-react-router';

import useForm, { FormContext } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import {
  Alert,
  Button,
  Card,
  CardBody,
  CardHeader,
  CardFooter,
  Col,
  Container,
  Form,
  Row,
  Table,
} from 'reactstrap';
import { MdClose } from 'react-icons/md';

import { default as siteConfig } from '@/config/site';
import * as routes from '@/config/routes';

import { FormInput } from '@/components/Form';

import { ApplicationState } from '@/reducers';
import { getListOfAccountsFromAccounting } from '@/reducers/accounting';
import {
  updateJournalAction,
  Transaction,
  TransactionType,
} from '@/reducers/accounting/journals';
import { IListAccountsState } from '@/reducers/accounting/accounts';

import { updateJournalValidation } from './UpdateJournalValidation';

export interface UpdateJournalFormProps {
  transaction: Transaction;
}

export const UpdateJournalForm: React.FunctionComponent<UpdateJournalFormProps> = ({
  children,
  transaction,
}) => {
  const addMoreRef = React.useRef<HTMLButtonElement>(null);
  const [indexes, setIndexes] = React.useState<number[]>(
    R.range(0, transaction.journals.length),
  );
  const [counter, setCounter] = React.useState(transaction.journals.length);

  const listAccounts = useSelector((state: ApplicationState) =>
    getListOfAccountsFromAccounting(state.accounting),
  ) as IListAccountsState;

  const defaultAmount = !transaction.journals[0]
    ? 0
    : Number(transaction.journals[0].amount);

  const creditRef = React.useRef<number>(defaultAmount);
  const debitRef = React.useRef<number>(defaultAmount);

  const dispatch = useDispatch();
  const { t } = useTranslation('accounting');

  const formContext = useForm({
    validationSchema: updateJournalValidation,
    defaultValues: {
      ...R.omit(['journals'], transaction),
      entries: transaction.journals.map(journal => ({
        ...journal,
        credit:
          journal.type === TransactionType.CREDIT ? Number(journal.amount) : 0,
        debit:
          journal.type === TransactionType.DEBIT ? Number(journal.amount) : 0,
      })),
    },
  });

  const watchEntries = formContext.watch('entries');

  const onSubmit = _data => {
    const data = {
      ..._data,
      journals: _data.entries.map(entry => ({
        account: entry.account,
        currency: siteConfig.currency,
        amount: entry.debit !== 0 ? entry.debit : entry.credit,
        type:
          entry.debit !== 0 ? TransactionType.DEBIT : TransactionType.CREDIT,
        memo: entry.memo,
      })),
    };

    delete data.entries;

    dispatch(updateJournalAction.request(data, String(transaction.id)));
    dispatch(push(routes.accounting.journal.list));
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
      ([credit, debit], entry) => {
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
        <Card className="my-3">
          <CardHeader>
            <b>
              Transaction ID{' '}
              <span className="float-right">{transaction.transactionId}</span>
            </b>
            <br />
            <b>
              Currency{' '}
              <span className="float-right">{siteConfig.currency}</span>
            </b>
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
                  <th className="text-center">
                    {t('journal.create.account.label')}
                  </th>
                  <th>{t('journal.create.description.label')}</th>
                  <th className="text-center">
                    {t('journal.create.credit.label')}
                  </th>
                  <th className="text-center">
                    {t('journal.create.debit.label')}
                  </th>
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
                          <td colSpan={5}>
                            <Alert color="danger" key={fieldName}>
                              [Entries no. {index + 1}] -{' '}
                              {(formContext.errors[fieldName] as any).message}
                            </Alert>
                          </td>
                        </tr>
                      ) : null}
                      <tr>
                        <td>
                          <FormInput
                            type="select"
                            name={`${fieldName}.account.id`}
                            placeholder={t(
                              'journal.create.account.placeholder',
                            )}
                          >
                            {listAccounts.map(account => (
                              <option key={account.id} value={account.id}>
                                {account.name}
                              </option>
                            ))}
                          </FormInput>
                        </td>
                        <td>
                          <FormInput
                            type="text"
                            name={`${fieldName}.memo`}
                            placeholder={t(
                              'journal.create.description.placeholder',
                            )}
                          />
                        </td>
                        <td>
                          <FormInput
                            type="number"
                            name={`${fieldName}.credit`}
                            placeholder={t('journal.create.credit.placeholder')}
                          />
                        </td>
                        <td>
                          <FormInput
                            type="number"
                            name={`${fieldName}.debit`}
                            placeholder={t('journal.create.debit.placeholder')}
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
                  <td className="text-right">Total</td>
                  <td>
                    <p className="float-left">{siteConfig.currency}</p>
                    <p className="float-right">{creditRef.current}</p>
                  </td>
                  <td>
                    <p className="float-left">{siteConfig.currency}</p>
                    <p className="float-right">{debitRef.current}</p>
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

UpdateJournalForm.propTypes = {} as React.ValidationMap<UpdateJournalFormProps>;

UpdateJournalForm.defaultProps = {};

import React from 'react';

import { CreateLedgerForm } from './CreateLedgerForm';

export interface CreateLedgerPageProps {}

export const CreateLedgerPage: React.FunctionComponent<CreateLedgerPageProps> = () => {
  return <CreateLedgerForm />;
};

export default CreateLedgerPage;

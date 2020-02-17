import React from 'react';

import { CreateJournalForm } from './CreateJournalForm';

export interface CreateJournalProps {}

export const CreateJournalPage: React.FunctionComponent<CreateJournalProps> = () => {
  return <CreateJournalForm />;
};

export default CreateJournalPage;

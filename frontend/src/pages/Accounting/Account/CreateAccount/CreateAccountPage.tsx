import React from 'react';

import { CreateAccountForm } from './CreateAccountForm';

export interface CreateAccountPageProps {}

export const CreateAccountPage: React.FunctionComponent<CreateAccountPageProps> = () => {
  return <CreateAccountForm />;
};

export default CreateAccountPage;

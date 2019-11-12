import React from 'react';

import { useFormContext } from 'react-hook-form';
import { FormFeedback } from 'reactstrap';

export interface FormErrorMessageProps {
  name: string;
}

export const FormErrorMessage: React.FunctionComponent<
  FormErrorMessageProps
> = ({ name }) => {
  const { errors } = useFormContext();
  // if (!errors) return null;

  return errors[name] ? (
    <FormFeedback>{(errors[name] as any).message}</FormFeedback>
  ) : null;
};

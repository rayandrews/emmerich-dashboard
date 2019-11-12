import React from 'react';
import PropTypes from '@/utils/propTypes';

import { useFormContext } from 'react-hook-form';

import { FormGroup, Label, Input, InputProps } from 'reactstrap';

import { FormErrorMessage } from './FormErrorMessage';

export interface FormInputProps extends InputProps {
  name: string;
  label?: string;
}

export const FormInput: React.FunctionComponent<FormInputProps> = ({
  name,
  label,
  children,
  ...restInputProps
}) => {
  const { register, errors, formState } = useFormContext(); // retrieve all hook methods

  return (
    <FormGroup>
      <Label for={label}>{label}</Label>
      <Input
        valid={!errors[name] && !!formState.touched[name]}
        invalid={!!errors[name]}
        name={name}
        {...restInputProps}
        innerRef={register}
      >
        {children}
      </Input>
      <FormErrorMessage name={name} />
    </FormGroup>
  );
};

FormInput.propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.string,
} as React.ValidationMap<FormInputProps>;

FormInput.defaultProps = {
  label: '',
};

import React from 'react';
import PropTypes from '@/utils/propTypes';

import { useFormContext } from 'react-hook-form';

import { FormGroup, Label } from 'reactstrap';

import { OptionTypeBase } from 'react-select';
// import BaseAsyncCreatableSelect, { Props } from 'react-select/async-creatable';
import BaseAsyncCreatableSelect, { Props } from 'react-select/async';

import { FormErrorMessage } from './FormErrorMessage';

export interface AsyncSelectProps<OptionType extends OptionTypeBase = []>
  extends Props<OptionType> {
  name: string;
  label?: string;
}

export function AsyncSelect<T>({
  name,
  label,
  ...restInputProps
}: AsyncSelectProps<T>) {
  const { register, errors, formState } = useFormContext(); // retrieve all hook methods

  return (
    <FormGroup>
      <Label for={label}>{label}</Label>
      <BaseAsyncCreatableSelect
        name={name}
        valid={!errors[name] && !!formState.touched[name]}
        invalid={!!errors[name]}
        {...restInputProps}
        innerRef={register}
      />
      <FormErrorMessage name={name} />
    </FormGroup>
  );
}

AsyncSelect.propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.string,
} as React.ValidationMap<AsyncSelectProps>;

AsyncSelect.defaultProps = {
  label: '',
};

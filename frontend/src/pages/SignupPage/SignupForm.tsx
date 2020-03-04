import React, { MouseEventHandler } from 'react';
import PropTypes from '@/utils/propTypes';
// import * as R from 'ramda'

import { push } from 'connected-react-router';
import { useDispatch } from 'react-redux';

import { Button, Form } from 'reactstrap';

import { useForm, FormContext } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import { FormInput } from '@/components/Form';
import { Logo } from '@/components/Logo';

import { createUserAction } from '@/reducers/user';

import { signupValidation } from './SignupValidation';

export interface SignupFormProps {
  showLogo?: boolean;
  onLogoClick?: MouseEventHandler;
}

export const SignupForm: React.FunctionComponent<SignupFormProps> = ({
  showLogo = true,
  children,
  onLogoClick = () => {},
}) => {
  const dispatch = useDispatch();
  const { t } = useTranslation('user');

  const formContext = useForm({
    validationSchema: signupValidation,
  });

  const onSubmit = data => {
    dispatch(createUserAction.request(data));
  };

  return (
    <FormContext {...formContext}>
      <Form onSubmit={formContext.handleSubmit(onSubmit)}>
        {showLogo && <Logo onClick={onLogoClick} />}
        <FormInput
          name="username"
          type="text"
          label={t('create.username.label')}
          placeholder={t('create.username.placeholder')}
        />
        <FormInput
          name="email"
          type="email"
          label={t('create.email.label')}
          placeholder={t('create.email.placeholder')}
        />
        <FormInput
          name="name"
          type="text"
          label={t('create.name.label')}
          placeholder={t('create.name.placeholder')}
        />
        <FormInput
          name="password"
          type="password"
          label={t('create.passwordConfirmation.label')}
          placeholder={t('create.passwordConfirmation.placeholder')}
        />
        <FormInput
          name="passwordConfirmation"
          type="password"
          label={t('create.passwordConfirmation.label')}
          placeholder={t('create.passwordConfirmation.placeholder')}
        />
        <hr />
        <Button
          size="lg"
          className="bg-gradient-theme-left border-0"
          block
          onClick={formContext.handleSubmit(onSubmit)}
        >
          Sign Up
        </Button>

        <div className="text-center pt-1">
          <h6>or</h6>
          <h6>
            <a href="#login" onClick={() => dispatch(push('/login'))}>
              Login
            </a>
          </h6>
        </div>

        {children}
      </Form>
    </FormContext>
  );
};

SignupForm.propTypes = {
  showLogo: PropTypes.bool,
  onLogoClick: PropTypes.func,
} as React.ValidationMap<SignupFormProps>;

SignupForm.defaultProps = {
  showLogo: true,
  onLogoClick: () => {},
};

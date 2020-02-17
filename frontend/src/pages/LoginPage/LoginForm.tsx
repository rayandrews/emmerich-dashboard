import React, { MouseEventHandler } from 'react';
import PropTypes from '@/utils/propTypes';

import { push } from 'connected-react-router';
import { useDispatch } from 'react-redux';

import { Button, Form } from 'reactstrap';

import { useForm, FormContext } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import { FormInput } from '@/components/Form';
import { Logo } from '@/components/Logo';

import { loginAction } from '@/reducers/auth';

import { loginValidation } from './LoginValidation';

export interface LoginFormProps {
  showLogo?: boolean;
  onLogoClick?: MouseEventHandler;
}

export const LoginForm: React.FunctionComponent<LoginFormProps> = ({
  showLogo = true,
  children,
  onLogoClick = () => {},
}) => {
  const dispatch = useDispatch();
  const { t } = useTranslation('auth');

  const formContext = useForm({
    validationSchema: loginValidation,
  });

  const onSubmit = data => {
    dispatch(loginAction.request(data));
    dispatch(push('/'));
  };

  return (
    <FormContext {...formContext}>
      <Form onSubmit={formContext.handleSubmit(onSubmit)}>
        {showLogo && <Logo onClick={onLogoClick} />}
        <FormInput
          type="text"
          name="username"
          label={t('login.username.label')}
          placeholder={t('login.username.placeholder')}
        />
        <FormInput
          type="password"
          name="password"
          label={t('login.password.label')}
          placeholder={t('login.password.placeholder')}
        />
        <hr />
        <Button
          size="lg"
          className="bg-gradient-theme-left border-0"
          block
          onClick={formContext.handleSubmit(onSubmit)}
        >
          Login
        </Button>

        <div className="text-center pt-1">
          <h6>or</h6>
          <h6>
            <a href="#signup" onClick={() => dispatch(push('/signup'))}>
              Signup
            </a>
          </h6>
        </div>

        {children}
      </Form>
    </FormContext>
  );
};

LoginForm.propTypes = {
  showLogo: PropTypes.bool,
  onLogoClick: PropTypes.func,
} as React.ValidationMap<LoginFormProps>;

LoginForm.defaultProps = {
  showLogo: true,
  onLogoClick: () => {},
};

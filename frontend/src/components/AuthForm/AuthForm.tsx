import React, { MouseEventHandler } from 'react';
import PropTypes from '@/utils/propTypes';

import { Button, Form, FormGroup, Input, Label } from 'reactstrap';

import useForm, { FormContext } from 'react-hook-form';

import logo200Image from '@/assets/img/logo/logo_200.png';

import { FormInput } from '@/components/Form';

import { loginValidation } from '@/pages/LoginPage/LoginValidation';

export const STATE_LOGIN = 'LOGIN';
export const STATE_SIGNUP = 'SIGNUP';

export type AuthStateType = 'LOGIN' | 'SIGNUP';

export interface AuthFormProps {
  authState?: AuthStateType;
  onChangeAuthState: (AuthStateType) => void;
  showLogo?: boolean;
  buttonText?: string;
  usernameLabel?: string;
  usernameInputProps?: object;
  passwordLabel?: string;
  passwordInputProps?: object;
  confirmPasswordLabel?: string;
  confirmPasswordInputProps?: object;
  onLogoClick?: MouseEventHandler;
}

export const AuthForm: React.FunctionComponent<AuthFormProps> = ({
  authState = 'LOGIN',
  showLogo = true,
  usernameLabel = 'Email',
  usernameInputProps = {
    type: 'email',
    placeholder: 'your@email.com',
  },
  passwordLabel = 'Password',
  passwordInputProps = {
    type: 'password',
    placeholder: 'your password',
  },
  confirmPasswordLabel = 'Confirm Password',
  confirmPasswordInputProps = {
    type: 'password',
    placeholder: 'confirm your password',
  },
  children,
  onLogoClick = () => {},
  onChangeAuthState,
  buttonText = '',
}) => {
  const formContext = useForm({
    validationSchema: loginValidation,
  });

  const onSubmit = data => console.log(data);

  const isLogin = () => {
    return authState === STATE_LOGIN;
  };

  const isSignup = () => {
    return authState === STATE_SIGNUP;
  };

  const changeAuthState = (authState: AuthStateType) => event => {
    event.preventDefault();
    onChangeAuthState(authState);
  };

  // const handleSubmit = event => {
  //   event.preventDefault();
  // };

  const renderButtonText = () => {
    if (!buttonText && isLogin()) {
      return 'Login';
    }

    if (!buttonText && isSignup()) {
      return 'Signup';
    }

    return buttonText;
  };

  return (
    <FormContext {...formContext}>
      <Form onSubmit={formContext.handleSubmit(onSubmit)}>
        {showLogo && (
          <div className="text-center pb-4">
            <img
              src={logo200Image}
              className="rounded"
              style={{ width: 60, height: 60, cursor: 'pointer' }}
              alt="logo"
              onClick={onLogoClick}
            />
          </div>
        )}
        <FormInput
          label={usernameLabel}
          {...usernameInputProps}
          name="username"
        />
        <FormInput
          label={passwordLabel}
          {...passwordInputProps}
          name="password"
        />
        {isSignup() && (
          <FormInput
            label={confirmPasswordLabel}
            {...confirmPasswordInputProps}
            name="confirmPassword"
          />
        )}
        <FormGroup check>
          <Label check>
            <Input type="checkbox" />{' '}
            {isSignup() ? 'Agree the terms and policy' : 'Remember me'}
          </Label>
        </FormGroup>
        <hr />
        <Button
          size="lg"
          className="bg-gradient-theme-left border-0"
          block
          onClick={formContext.handleSubmit(onSubmit)}
        >
          {renderButtonText()}
        </Button>

        <div className="text-center pt-1">
          <h6>or</h6>
          <h6>
            {isSignup() ? (
              <a href="#login" onClick={changeAuthState(STATE_LOGIN)}>
                Login
              </a>
            ) : (
              <a href="#signup" onClick={changeAuthState(STATE_SIGNUP)}>
                Signup
              </a>
            )}
          </h6>
        </div>

        {children}
      </Form>
    </FormContext>
  );
};

AuthForm.propTypes = {
  authState: PropTypes.oneOf([STATE_LOGIN, STATE_SIGNUP]).isRequired,
  showLogo: PropTypes.bool,
  usernameLabel: PropTypes.string,
  usernameInputProps: PropTypes.object,
  passwordLabel: PropTypes.string,
  passwordInputProps: PropTypes.object,
  confirmPasswordLabel: PropTypes.string,
  confirmPasswordInputProps: PropTypes.object,
  onLogoClick: PropTypes.func,
} as React.ValidationMap<AuthFormProps>;

AuthForm.defaultProps = {
  authState: 'LOGIN',
  showLogo: true,
  usernameLabel: 'Email',
  usernameInputProps: {
    type: 'email',
    placeholder: 'your@email.com',
  },
  passwordLabel: 'Password',
  passwordInputProps: {
    type: 'password',
    placeholder: 'your password',
  },
  confirmPasswordLabel: 'Confirm Password',
  confirmPasswordInputProps: {
    type: 'password',
    placeholder: 'confirm your password',
  },
  onLogoClick: () => {},
};

export default AuthForm;

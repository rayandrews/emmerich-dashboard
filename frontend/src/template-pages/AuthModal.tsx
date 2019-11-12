import React, { useState } from 'react';

import { Button, Modal, ModalBody } from 'reactstrap';

import { AuthForm, STATE_LOGIN, AuthStateType } from '@/components/AuthForm';

interface AuthModalState {
  show: boolean;
  authState: AuthStateType;
}

const AuthModal = () => {
  const [state, setState] = React.useState<AuthModalState>({
    show: true,
    authState: STATE_LOGIN,
  });

  const toggle = () =>
    setState(prevState => ({
      show: !prevState.show,
      ...prevState,
    }));

  const handleAuthState = (authState: AuthStateType) =>
    setState(prevState => ({
      authState: authState,
      ...prevState,
    }));

  return (
    <div>
      <Button color="danger" onClick={toggle}>
        Login
      </Button>
      <Modal
        isOpen={state.show}
        toggle={toggle}
        size="sm"
        fade={false}
        centered
      >
        <ModalBody>
          <AuthForm
            authState={state.authState}
            onChangeAuthState={handleAuthState}
          />
        </ModalBody>
      </Modal>
    </div>
  );
};

export default AuthModal;

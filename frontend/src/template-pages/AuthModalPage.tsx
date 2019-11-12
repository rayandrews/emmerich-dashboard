import React from 'react';
import { useMachine } from '@xstate/react';

import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Col,
  Modal,
  ModalBody,
  Row,
} from 'reactstrap';

import { AuthForm, AuthStateType } from '@/components/AuthForm';
import { Page } from '@/components/Page';
import { ToggleMachine } from '@/machines/ToggleMachine';

export interface AuthModalPageState {
  show: boolean;
  authState: AuthStateType;
}

const AuthModalPage: React.FunctionComponent = () => {
  const [current, send] = useMachine(ToggleMachine);

  const [auth, changeAuth] = React.useState<AuthStateType>('LOGIN');

  const toggle = () => {
    send('TOGGLE');
  };

  const externalCloseBtn = (
    <button
      className="close"
      style={{
        position: 'absolute',
        top: '15px',
        right: '20px',
        fontSize: '3rem',
      }}
      onClick={toggle}
    >
      &times;
    </button>
  );

  return (
    <Page
      title="Login Modal"
      breadcrumbs={[{ name: 'login modal', active: true }]}
    >
      <Row>
        <Col md="12" sm="12" xs="12">
          <Card>
            <CardHeader>Login Modal Example</CardHeader>
            <CardBody>
              <Button color="danger" onClick={toggle}>
                Click to Login
              </Button>
              <Modal
                isOpen={current.matches('active')}
                toggle={toggle}
                size="sm"
                backdrop="static"
                backdropClassName="modal-backdrop-light"
                external={externalCloseBtn}
                centered
              >
                <ModalBody>
                  <AuthForm authState={auth} onChangeAuthState={changeAuth} />
                </ModalBody>
              </Modal>
            </CardBody>
          </Card>
        </Col>
      </Row>
    </Page>
  );
};

export default AuthModalPage;

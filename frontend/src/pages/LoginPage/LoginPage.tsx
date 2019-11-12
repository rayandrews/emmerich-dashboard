import React from 'react';

import { Card, Col, Row } from 'reactstrap';

import { LoginForm } from './LoginForm';

export interface LoginPageProps {}

export const LoginPage: React.FunctionComponent<LoginPageProps> = () => {
  return (
    <Row
      style={{
        height: '100vh',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Col md={6} lg={4}>
        <Card body>
          <LoginForm />
        </Card>
      </Col>
    </Row>
  );
};

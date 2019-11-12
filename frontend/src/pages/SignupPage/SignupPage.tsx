import React from 'react';

import { Card, Col, Row } from 'reactstrap';

import { SignupForm } from './SignupForm';

export interface LoginPageProps {}

export const SignupPage: React.FunctionComponent<LoginPageProps> = () => {
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
          <SignupForm />
        </Card>
      </Col>
    </Row>
  );
};

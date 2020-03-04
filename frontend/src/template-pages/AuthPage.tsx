import React from 'react';

import { Card, Col, Row } from 'reactstrap';

import { History } from 'history';

import { DEFAULT_ROUTE } from '@/config/routes';

import { AuthForm, STATE_LOGIN, AuthStateType } from '@/components/AuthForm';

export interface AuthPageProps {
  authState: AuthStateType;
  history: History;
}

const AuthPage: React.FunctionComponent<AuthPageProps> = ({
  authState,
  history,
}) => {
  const handleAuthState = _authState => {
    if (_authState === STATE_LOGIN) {
      history.push('/login');
    } else {
      history.push('/signup');
    }
  };

  const handleLogoClick = () => {
    history.push(DEFAULT_ROUTE);
  };

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
          <AuthForm
            authState={authState}
            onChangeAuthState={handleAuthState}
            onLogoClick={handleLogoClick}
          />
        </Card>
      </Col>
    </Row>
  );
};

// class AuthPage extends React.Component {
//   handleAuthState = authState => {
//     if (authState === STATE_LOGIN) {
//       this.props.history.push('/login');
//     } else {
//       this.props.history.push('/signup');
//     }
//   };

//   handleLogoClick = () => {
//     this.props.history.push('/');
//   };

//   render() {
//     return (
//       <Row
//         style={{
//           height: '100vh',
//           justifyContent: 'center',
//           alignItems: 'center',
//         }}
//       >
//         <Col md={6} lg={4}>
//           <Card body>
//             <AuthForm
//               authState={this.props.authState}
//               onChangeAuthState={this.handleAuthState}
//               onLogoClick={this.handleLogoClick}
//             />
//           </Card>
//         </Col>
//       </Row>
//     );
//   }
// }

export default AuthPage;

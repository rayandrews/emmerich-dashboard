import React from 'react';
import { useSelector } from 'react-redux';
import { Route, Redirect } from 'react-router-dom';

import { ApplicationState } from '@/reducers';
import { isLoggedInFromAuth } from '@/reducers/auth';

import { RouteProps } from './types';

// A wrapper for <Route> that redirects to the login
// screen if you're not yet authenticated.
export const ProtectedRoute: React.FunctionComponent<RouteProps> = ({
  // children,
  component: Component,
  layout: Layout,
  ...rest
}) => {
  const isLoggedIn = useSelector((state: ApplicationState) =>
    isLoggedInFromAuth(state.auth),
  );

  return (
    <Route
      {...rest}
      render={props =>
        isLoggedIn ? (
          Layout ? (
            <Layout>
              <Component {...props} />
            </Layout>
          ) : (
            <Component {...props} />
          )
        ) : (
          <Redirect
            to={{
              pathname: '/login',
              state: { from: props.location },
            }}
          />
        )
      }
    />
  );
};

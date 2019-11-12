import React from 'react';
import { useSelector } from 'react-redux';
import { Route, Redirect } from 'react-router-dom';

import { ApplicationState } from '@/reducers';
import { isLoggedInFromAuth } from '@/reducers/auth';

import { RouteProps } from './types';

export const UnauthenticatedRoute: React.FunctionComponent<RouteProps> = ({
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
          <Redirect
            to={{
              pathname: '/',
              state: { from: props.location },
            }}
          />
        ) : Layout ? (
          <Layout>
            <Component {...props} />
          </Layout>
        ) : (
          <Component {...props} />
        )
      }
    />
  );
};

import React from 'react';
import { Location } from 'history';

import { RouteChildrenProps } from 'react-router';
import { Route, RouteComponentProps } from 'react-router-dom';

export interface LayoutRouteProps {
  location?: Location;
  component: React.ComponentType<RouteComponentProps>;
  render?: (props: RouteComponentProps<any>) => React.ReactNode;
  children?:
    | ((props: RouteChildrenProps<any>) => React.ReactNode)
    | React.ReactNode;
  path?: string | string[];
  exact?: boolean;
  sensitive?: boolean;
  strict?: boolean;
  layout: React.ComponentType;
}

export const LayoutRoute: React.FunctionComponent<LayoutRouteProps> = ({
  component: Component,
  layout: Layout,
  ...rest
}) => (
  <Route
    {...rest}
    render={props => (
      <Layout>
        <Component {...props} />
      </Layout>
    )}
  />
);

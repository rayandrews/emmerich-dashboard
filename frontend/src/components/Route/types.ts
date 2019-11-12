import { RouteProps as BaseRouteProps } from 'react-router-dom';

export interface RouteProps extends BaseRouteProps {
  component: any;
  layout?: React.ComponentType;
}

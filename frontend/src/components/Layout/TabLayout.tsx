import React, { useState } from 'react';
import { TabContent, TabPane, Nav, NavItem, NavLink } from 'reactstrap';

import { ProtectedRoute } from '@/components/Route';

import classnames from 'classnames';

export interface ITabRoute {
  [key: string]: {
    path: string;
    component: React.ComponentType;
  };
}

export interface TabLayoutProps {
  routes: ITabRoute;
}

export const TabLayout: React.FunctionComponent<TabLayoutProps> = ({
  routes,
}) => {
  const [activeTab, setActiveTab] = useState('list');

  const toggle = tab => {
    if (activeTab !== tab) {
      setActiveTab(tab);
      console.log(tab);
    }
  };

  const routeKeys = Object.keys(routes);
  const routePaths = Object.values(routes);

  return (
    <div>
      <Nav tabs>
        {routeKeys.map((routeKey, idx) => {
          return (
            <NavItem key={routeKey}>
              <NavLink
                className={classnames({ active: activeTab === '1' })}
                onClick={() => {
                  toggle(routeKey);
                }}
              >
                {routeKey}
              </NavLink>
            </NavItem>
          );
        })}
      </Nav>
      <TabContent activeTab={activeTab}>
        {routePaths.map(({ path, component: Component }, idx) => {
          return (
            <TabPane key={path} tabId={routeKeys[idx]}>
              <ProtectedRoute exact path={path} component={Component} />
            </TabPane>
          );
        })}
      </TabContent>
    </div>
  );
};

TabLayout.propTypes = {} as React.ValidationMap<TabLayoutProps>;

TabLayout.defaultProps = {};

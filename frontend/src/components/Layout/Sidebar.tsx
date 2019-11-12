import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';

import {
  MdDashboard,
  MdKeyboardArrowDown,
  MdSend,
  MdTextFields,
} from 'react-icons/md';
import { IconType } from 'react-icons/lib/cjs';
import {
  Collapse,
  Nav,
  Navbar,
  NavItem,
  NavLink as BSNavLink,
} from 'reactstrap';

import sidebarBgImage from '@/assets/img/sidebar/sidebar-4.jpg';

import * as routes from '@/config/routes';

import { ApplicationState } from '@/reducers';
import { isSidebarOpen } from '@/reducers/app';

import { SourceLink } from '@/components/SourceLink';

import bn from '@/utils/bemnames';

const sidebarBackground = {
  backgroundImage: `url("${sidebarBgImage}")`,
  backgroundSize: 'cover',
  backgroundRepeat: 'no-repeat',
};

export interface INavItem {
  to?: string;
  name: string;
  exact?: boolean;
  Icon: IconType;
  children?: INavItem[];
}

const navItems: INavItem[] = [
  { to: '/', name: 'dashboard', exact: true, Icon: MdDashboard },
  {
    name: 'accounting',
    Icon: MdSend,
    children: [
      {
        name: 'ledgers',
        Icon: MdTextFields,
        children: [
          {
            to: routes.accounting.ledger.list,
            name: 'list ledgers',
            exact: false,
            Icon: MdTextFields,
          },
          {
            to: routes.accounting.ledger.create,
            name: 'create ledger',
            exact: false,
            Icon: MdTextFields,
          },
        ],
      },
      {
        name: 'accounts',
        Icon: MdTextFields,
        children: [
          {
            to: routes.accounting.account.list,
            name: 'list accounts',
            exact: false,
            Icon: MdTextFields,
          },
          {
            to: routes.accounting.account.create,
            name: 'create account',
            exact: false,
            Icon: MdTextFields,
          },
        ],
      },
      {
        name: 'journals',
        Icon: MdTextFields,
        children: [
          {
            to: routes.accounting.journal.list,
            name: 'list journals',
            exact: false,
            Icon: MdTextFields,
          },
          {
            to: routes.accounting.journal.create,
            name: 'create journal',
            exact: false,
            Icon: MdTextFields,
          },
        ],
      },
    ],
  },
];

const bem = bn.create('sidebar');

const generateSidebarMenu = (
  navs: INavItem[],
  state,
  handleClick,
  parentName = null,
) => {
  return (
    <>
      {navs.map(({ to, name, exact, Icon, children }, index) => {
        const computedName = parentName ? `${parentName}_${name}` : name;

        return children ? (
          <React.Fragment key={computedName}>
            <NavItem
              id={`navItem-${computedName}-${index}`}
              className={bem.e('nav-item')}
              onClick={handleClick(computedName)}
            >
              <BSNavLink className={bem.e('nav-item-collapse')}>
                <div className="d-flex">
                  <Icon className={bem.e('nav-item-icon')} />
                  <span className="align-self-start text-uppercase">
                    {computedName}
                  </span>
                </div>
                <MdKeyboardArrowDown
                  className={bem.e('nav-item-icon')}
                  style={{
                    padding: 0,
                    transform: state[`isOpen_${computedName}`]
                      ? 'rotate(0deg)'
                      : 'rotate(-90deg)',
                    transitionDuration: '0.3s',
                    transitionProperty: 'transform',
                  }}
                />
              </BSNavLink>
            </NavItem>
            <Collapse isOpen={state[`isOpen_${computedName}`]}>
              {generateSidebarMenu(children, state, handleClick)}
            </Collapse>
          </React.Fragment>
        ) : (
          <NavItem key={computedName} className={bem.e('nav-item')}>
            <BSNavLink
              id={`navItem-${computedName}-${index}`}
              className="text-uppercase"
              tag={NavLink}
              to={to}
              activeClassName="active"
              exact={exact}
            >
              <Icon className={bem.e('nav-item-icon')} />
              <span className="">{computedName}</span>
            </BSNavLink>
          </NavItem>
        );
      })}
    </>
  );
};

export const Sidebar = () => {
  const sidebarOpen = useSelector((state: ApplicationState) =>
    isSidebarOpen(state.app),
  ) as boolean;

  const asideRef = React.useRef(null);

  const [state, setState] = React.useState({
    isOpen_components: true,
    isOpen_contents: true,
    isOpen_pages: true,
  });

  const handleClick = name => () => {
    setState(prevState => {
      const isOpen = prevState[`isOpen_${name}`];

      return {
        ...prevState,
        [`isOpen_${name}`]: !isOpen,
      };
    });
  };

  const sidebarStatusClassName = sidebarOpen ? ` ${bem.m('open')}` : '';

  return (
    <aside
      ref={asideRef}
      className={`${bem.b()}${sidebarStatusClassName}`}
      data-image={sidebarBgImage}
    >
      <div className={bem.e('background')} style={sidebarBackground} />
      <div className={bem.e('content')}>
        <Navbar>
          <SourceLink className="navbar-brand d-flex">
            <span className="text-white">Emmerich</span>
          </SourceLink>
        </Navbar>
        <Nav vertical>{generateSidebarMenu(navItems, state, handleClick)}</Nav>
      </div>
    </aside>
  );
};

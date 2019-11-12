import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';

import {
  MdClearAll,
  MdExitToApp,
  // MdNotificationsActive,
  // MdNotificationsNone,
} from 'react-icons/md';

import {
  Button,
  ListGroup,
  ListGroupItem,
  Nav,
  Navbar,
  NavItem,
  NavLink,
  Popover,
  PopoverBody,
} from 'reactstrap';

import { ApplicationState } from '@/reducers';
import { openSidebar, closeSidebar, isSidebarOpen } from '@/reducers/app';
import {
  checkProfileAction,
  isLoggedInFromAuth,
  logoutAction,
  getUserFromAuth,
  User,
} from '@/reducers/auth';

import { Avatar } from '@/components/Avatar';
import { UserCard } from '@/components/Card';
// import { Notifications } from '@/components/Notifications';
import { SearchInput } from '@/components/SearchInput';
// import { notificationsData } from '@/demos/header';
// import { withBadge } from '@/hocs/withBadge';

import bn from '@/utils/bemnames';
import { formatFullDate } from '@/utils/date';

// const MdNotificationsActiveWithBadge = withBadge({
//   size: 'md',
//   color: 'primary',
//   style: {
//     top: -10,
//     right: -10,
//     display: 'inline-flex',
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   children: <small>5</small>,
// })(MdNotificationsActive);

export const Header: React.FunctionComponent = () => {
  const dispatch = useDispatch();
  const history = useHistory();

  const bem = bn.create('header');

  const initialState = {
    isOpenNotificationPopover: false,
    isNotificationConfirmed: false,
    isOpenUserCardPopover: false,
  };

  const logout = React.useCallback(() => {
    dispatch(logoutAction());
  }, [dispatch]);

  const getProfile = React.useCallback(() => {
    dispatch(checkProfileAction.request());
  }, [dispatch]);

  const sidebarOpen = useSelector((state: ApplicationState) =>
    isSidebarOpen(state.app),
  ) as boolean;

  const isLoggedIn = useSelector((state: ApplicationState) =>
    isLoggedInFromAuth(state.auth),
  ) as boolean;

  const user = useSelector((state: ApplicationState) =>
    getUserFromAuth(state.auth),
  ) as User;

  const handleOpenSidebar = React.useCallback(() => {
    dispatch(openSidebar());
  }, [dispatch]);

  const handleCloseSidebar = React.useCallback(
    () => () => {
      dispatch(closeSidebar());
    },
    [dispatch],
  );

  const [state, setState] = React.useState(initialState);

  // const toggleNotificationPopover = () => {
  //   setState(prevState => ({
  //     ...prevState,
  //     isOpenNotificationPopover: !prevState.isOpenNotificationPopover,
  //   }));

  //   if (!state.isNotificationConfirmed) {
  //     setState(prevState => ({ ...prevState, isNotificationConfirmed: true }));
  //   }
  // };

  const toggleUserCardPopover = () => {
    setState(prevState => ({
      ...prevState,
      isOpenUserCardPopover: !prevState.isOpenUserCardPopover,
    }));
  };

  const handleSidebarControlButton = (event: React.MouseEvent) => {
    event.preventDefault();
    event.stopPropagation();

    if (sidebarOpen) {
      handleCloseSidebar();
    } else {
      handleOpenSidebar();
    }
  };

  React.useEffect(() => {
    return () => {
      setState(initialState);
    };
  }, [history.location]); // eslint-disable-line

  React.useEffect(() => {
    getProfile();
  }, [getProfile, isLoggedIn]);

  return (
    <Navbar light expand className={bem.b('bg-white')}>
      <Nav navbar className="mr-2">
        <Button outline onClick={handleSidebarControlButton}>
          <MdClearAll size={25} />
        </Button>
      </Nav>
      <Nav navbar>
        <SearchInput />
      </Nav>

      <Nav navbar className={bem.e('nav-right')}>
        {/* <NavItem className="d-inline-flex">
          <NavLink id="Popover1" className="position-relative">
            {state.isNotificationConfirmed ? (
              <MdNotificationsNone
                size={25}
                className="text-secondary can-click"
                onClick={toggleNotificationPopover}
              />
            ) : (
              <MdNotificationsActiveWithBadge
                size={25}
                className="text-secondary can-click animated swing infinite"
                onClick={toggleNotificationPopover}
              />
            )}
          </NavLink>
          <Popover
            placement="bottom"
            isOpen={state.isOpenNotificationPopover}
            toggle={toggleNotificationPopover}
            target="Popover1"
          >
            <PopoverBody>
              <Notifications notificationsData={notificationsData} />
            </PopoverBody>
          </Popover>
        </NavItem> */}

        <NavItem>
          {isLoggedIn && (
            <>
              <NavLink id="Popover2">
                <Avatar onClick={toggleUserCardPopover} className="can-click" />
              </NavLink>
              <Popover
                placement="bottom-end"
                isOpen={state.isOpenUserCardPopover}
                toggle={toggleUserCardPopover}
                target="Popover2"
                className="p-0 border-0"
                style={{ minWidth: 250 }}
              >
                <PopoverBody className="p-0 border-light">
                  <UserCard
                    title={user ? user.name : ''}
                    subtitle={user ? user.email : ''}
                    text={`Last login : ${
                      user
                        ? formatFullDate(new Date(user.lastLogin))
                        : new Date()
                    }`}
                    className="border-light"
                  >
                    <ListGroup flush>
                      <ListGroupItem
                        tag="button"
                        action
                        className="border-light"
                        onClick={logout}
                      >
                        <MdExitToApp /> Signout
                      </ListGroupItem>
                    </ListGroup>
                  </UserCard>
                </PopoverBody>
              </Popover>
            </>
          )}
        </NavItem>
      </Nav>
    </Navbar>
  );
};

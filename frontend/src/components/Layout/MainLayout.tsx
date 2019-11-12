import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import NotificationSystem from 'react-notification-system';

import { ApplicationState } from '@/reducers';
import { openSidebar, closeSidebar, isSidebarOpen } from '@/reducers/app';

import { useMediaBootstrap, MediaBootstrapQuery } from '@/hooks/useMedia';
import { Content, Footer, Header, Sidebar } from '@/components/Layout';
import { NOTIFICATION_SYSTEM_STYLE } from '@/utils/styles';

export interface MainLayoutProps {}

export const MainLayout: React.FunctionComponent<MainLayoutProps> = ({
  children,
}) => {
  const dispatch = useDispatch();
  const sidebarOpen = useSelector((state: ApplicationState) =>
    isSidebarOpen(state.app),
  ) as boolean;

  const handleOpenSidebar = React.useCallback(() => {
    dispatch(openSidebar());
  }, [dispatch]);

  const handleCloseSidebar = React.useCallback(() => {
    dispatch(closeSidebar());
  }, [dispatch]);

  const breakpoint = useMediaBootstrap();
  const notificationSystem = React.useRef<NotificationSystem.System>(null);

  const checkBreakpoint = React.useCallback(
    (breakpoint: MediaBootstrapQuery) => {
      switch (breakpoint) {
        case MediaBootstrapQuery.XS:
        case MediaBootstrapQuery.SM:
        case MediaBootstrapQuery.MD:
          return handleOpenSidebar();

        case MediaBootstrapQuery.LG:
        case MediaBootstrapQuery.XL:
        default:
          return handleCloseSidebar();
      }
    },
    [handleOpenSidebar, handleCloseSidebar],
  );

  const handleContentClick = event => {
    // close sidebar if sidebar is open and screen size is less than `md`
    if (
      sidebarOpen &&
      (breakpoint === MediaBootstrapQuery.XS ||
        breakpoint === MediaBootstrapQuery.SM ||
        breakpoint === MediaBootstrapQuery.MD)
    ) {
      handleCloseSidebar();
    }
  };

  React.useEffect(() => {
    checkBreakpoint(breakpoint);

    return () => {
      handleCloseSidebar();
    };
  }, [checkBreakpoint, handleCloseSidebar, breakpoint]);

  return (
    <main className="cr-app bg-light">
      <Sidebar />
      <Content fluid onClick={handleContentClick}>
        <Header />
        {children}
        <Footer />
      </Content>

      <NotificationSystem
        ref={notificationSystem}
        style={NOTIFICATION_SYSTEM_STYLE}
      />
    </main>
  );
};

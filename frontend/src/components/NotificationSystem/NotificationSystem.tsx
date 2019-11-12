import React from 'react';

import { useSelector, useDispatch } from 'react-redux';

import ReactNotificationSystem from 'react-notification-system';

import { ApplicationState } from '@/reducers';
import {
  getNotifications,
  Notification,
  removeNotification,
} from '@/reducers/app';
import { NOTIFICATION_SYSTEM_STYLE } from '@/utils/styles';

export interface NotificationSystemProps {}

export const NotificationSystem: React.FunctionComponent<
  NotificationSystemProps
> = () => {
  const notificationSystem = React.useRef<ReactNotificationSystem.System>(null);
  const dispatch = useDispatch();
  const removeNotificationDispatcher = React.useCallback(
    (
      notification: Notification,
      callback?: ReactNotificationSystem.CallBackFunction,
    ) => () => {
      if (callback) callback(notification);
      dispatch(removeNotification(notification.uid as string));
    },
    [dispatch],
  );

  const notifications = useSelector((state: ApplicationState) =>
    getNotifications(state.app),
  ) as Notification[];

  React.useEffect(() => {
    const notificationSystemRef = notificationSystem.current;
    if (!notificationSystemRef) {
      return;
    }

    notifications.forEach(_notification => {
      const notification: Notification = {
        ..._notification,
        onRemove: removeNotificationDispatcher(
          _notification,
          _notification.onRemove,
        ),
      };
      notificationSystemRef.addNotification(notification);
    });

    // return () => {
    //   notifications.forEach(notificationSystemRef.removeNotification);
    // };
  }, [notifications, notifications.length, removeNotificationDispatcher]);

  return (
    <ReactNotificationSystem
      ref={notificationSystem}
      style={NOTIFICATION_SYSTEM_STYLE}
    />
  );
};

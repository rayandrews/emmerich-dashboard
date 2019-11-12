import React from 'react';
import PropTypes from '@/utils/propTypes';

import { Media } from 'reactstrap';

import { Avatar } from '@/components/Avatar';

export interface Notification {
  id: string | number;
  avatar?: string;
  message?: React.ReactNode;
  date?: Date | string;
}

export interface NotificationsProp {
  notificationsData: Notification[];
}

export const Notifications: React.FunctionComponent<NotificationsProp> = ({
  notificationsData,
}) => {
  return (
    <>
      {notificationsData &&
        notificationsData.length &&
        notificationsData.map(({ id, avatar, message, date }) => (
          <Media key={id} className="pb-2">
            <Media left className="align-self-center pr-3">
              <Avatar tag={Media} src={avatar} alt="Avatar" />
            </Media>
            <Media body middle className="align-self-center">
              {message}
            </Media>
            <Media right className="align-self-center">
              <small className="text-muted">{date}</small>
            </Media>
          </Media>
        ))}
      )
    </>
  );
};

Notifications.propTypes = {
  notificationsData: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.ID,
      avatar: PropTypes.string,
      message: PropTypes.node,
      date: PropTypes.date,
    }),
  ),
} as React.ValidationMap<NotificationsProp>;

Notifications.defaultProps = {
  notificationsData: [],
};

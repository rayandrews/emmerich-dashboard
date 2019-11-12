import React from 'react';
import PropTypes from '@/utils/propTypes';

import classNames from 'classnames';
import {
  Card,
  CardTitle,
  CardSubtitle,
  CardText,
  CardBody,
  CardProps,
} from 'reactstrap';

import { Avatar } from '@/components/Avatar';

export interface UserCardProps extends CardProps {
  avatar?: string;
  avatarSize?: number;
  title?: string;
  subtitle?: string;
  text?: string;
  className?: string;
}

export const UserCard: React.FunctionComponent<UserCardProps> = ({
  avatar,
  avatarSize,
  title,
  subtitle,
  text,
  children,
  className,
  ...restProps
}) => {
  const classes = classNames('bg-gradient-theme', className);

  return (
    <Card inverse className={classes} {...restProps}>
      <CardBody className="d-flex justify-content-center align-items-center flex-column">
        <Avatar src={avatar} size={avatarSize} className="mb-2" />
        <CardTitle>{title}</CardTitle>
        <CardSubtitle>{subtitle}</CardSubtitle>
        <CardText>
          <small>{text}</small>
        </CardText>
      </CardBody>
      {children}
    </Card>
  );
};

UserCard.propTypes = {
  avatar: PropTypes.string,
  avatarSize: PropTypes.number,
  title: PropTypes.string,
  subtitle: PropTypes.string,
  text: PropTypes.string,
  className: PropTypes.string,
} as React.ValidationMap<UserCardProps>;

UserCard.defaultProps = {
  avatarSize: 80,
};

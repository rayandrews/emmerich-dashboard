import React from 'react';

import classNames from 'classnames';
import {
  Card,
  CardHeader,
  CardBody,
  CardText,
  Button,
  ButtonProps,
  CardProps,
} from 'reactstrap';

import { Avatar } from '@/components/Avatar';
import PropTypes from '@/utils/propTypes';

export interface AnnouncementCardProps extends CardProps {
  color?: string;
  header?: React.ReactNode;
  avatar?: string;
  avatarSize?: number;
  name?: string;
  date?: Date | string;
  className?: string;
  text?: string;
  buttonProps?: ButtonProps;
}

export const AnnouncementCard: React.FunctionComponent<
  AnnouncementCardProps
> = ({
  color,
  header,
  avatar,
  avatarSize,
  name,
  date,
  text,
  className,
  buttonProps,
  ...restProps
}) => {
  const bgColor = `bg-${color}`;
  const classes = classNames(bgColor, className);

  return (
    <Card inverse className={classes} {...restProps}>
      {header && typeof header === 'string' ? (
        <CardHeader className={bgColor}>{header}</CardHeader>
      ) : (
        header
      )}
      <CardBody className="d-flex flex-wrap flex-column align-items-center justify-content-center">
        <Avatar size={avatarSize} src={avatar} />
        <CardText className="text-center">
          <strong className="d-block">{name}</strong>
          <small className="text-muted">{date}</small>
        </CardText>
        <CardText className="text-center">{text}</CardText>

        <Button color="primary" {...buttonProps} />
      </CardBody>
    </Card>
  );
};

AnnouncementCard.propTypes = {
  color: PropTypes.string,
  header: PropTypes.node,
  avatar: PropTypes.string,
  avatarSize: PropTypes.number,
  name: PropTypes.string,
  date: PropTypes.date,
  className: PropTypes.string,
  children: PropTypes.element,
} as React.WeakValidationMap<AnnouncementCardProps>;

AnnouncementCard.defaultProps = {
  color: 'gradient-secondary',
  avatarSize: 60,
};

import React from 'react';
import PropTypes from '@/utils/propTypes';

import { Card, CardBody, CardSubtitle, CardText, CardTitle } from 'reactstrap';
import classNames from 'classnames';

import { Avatar } from '@/components/Avatar';

export interface AvatarCardProps {
  avatar: string;
  avatarSize: number;
  title: string;
  subtitle: string;
  text: string;
  className: string;
}

export const AvatarCard: React.FunctionComponent<AvatarCardProps> = ({
  avatar,
  avatarSize,
  title,
  subtitle,
  text,
  children,
  className,
  ...restProps
}) => {
  const classes = classNames('bg-gradient-theme-left', className);

  return (
    <Card inverse className={classes} {...restProps}>
      <CardBody className="d-flex justify-content-center align-items-center flex-column">
        <Avatar src={avatar} size={avatarSize} className="mb-3" />
        <CardTitle>{title}</CardTitle>
        {!!subtitle && <CardSubtitle>{subtitle}</CardSubtitle>}
        {!!text && (
          <CardText>
            <small>{text}</small>
          </CardText>
        )}
        {children}
      </CardBody>
    </Card>
  );
};

AvatarCard.propTypes = {
  avatar: PropTypes.string,
  avatarSize: PropTypes.number,
  title: PropTypes.string,
  subtitle: PropTypes.string,
  text: PropTypes.string,
  className: PropTypes.string,
} as React.ValidationMap<AvatarCardProps>;

AvatarCard.defaultProps = {
  avatarSize: 80,
};

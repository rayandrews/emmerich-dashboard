import React from 'react';
import PropTypes from '@/utils/propTypes';

import classNames from 'classnames';

import { Card, CardBody, CardTitle, CardSubtitle, CardProps } from 'reactstrap';

export interface IconWidgetProps extends CardProps {
  bgColor?: string;
  icon?: React.ComponentType<any> | React.ElementType<any> | any;
  iconProps?: any;
  title?: string;
  subtitle?: string;
  className?: string;
}

export const IconWidget: React.FunctionComponent<IconWidgetProps> = ({
  icon: Icon,
  title,
  subtitle,
  className,
  bgColor = 'primary',
  icon = 'span',
  iconProps = { size: 50 },
  ...restProps
}) => {
  const classes = classNames('cr-widget', className, {
    [`bg-${bgColor}`]: bgColor,
  });

  return (
    <Card inverse className={classes} {...restProps}>
      <CardBody className="cr-widget__icon">
        <Icon size={50} {...iconProps} />
      </CardBody>
      <CardBody>
        <CardTitle>{title}</CardTitle>
        <CardSubtitle>{subtitle}</CardSubtitle>
      </CardBody>
    </Card>
  );
};

IconWidget.propTypes = {
  bgColor: PropTypes.string,
  icon: PropTypes.component,
  iconProps: PropTypes.object,
  title: PropTypes.string,
  subtitle: PropTypes.string,
} as React.ValidationMap<IconWidgetProps>;

IconWidget.defaultProps = {
  bgColor: 'primary',
  icon: 'span',
  iconProps: { size: 50 },
};

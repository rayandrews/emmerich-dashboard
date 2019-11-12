import React from 'react';
import PropTypes from '@/utils/propTypes';

import { Card, CardText, CardTitle, Progress, CardProps } from 'reactstrap';
import { Typography } from '@/components/Typography';

export type NumberWidgetColorType =
  | 'primary'
  | 'secondary'
  | 'success'
  | 'info'
  | 'warning'
  | 'danger'
  | 'light'
  | 'dark';

export interface NumberWidgetProps extends CardProps {
  title?: string;
  subtitle?: string;
  number?: string | number;
  color?: NumberWidgetColorType;
  progress: {
    value: number;
    label: string;
  };
}

export const NumberWidget: React.FunctionComponent<NumberWidgetProps> = ({
  title = '',
  subtitle = '',
  number = 0,
  color = 'primary',
  progress: { value = 0, label = '' },
  ...restProps
}) => {
  return (
    <Card body {...restProps}>
      <div className="d-flex justify-content-between">
        <CardText tag="div">
          <Typography className="mb-0">
            <strong>{title}</strong>
          </Typography>
          <Typography className="mb-0 text-muted small">{subtitle}</Typography>
        </CardText>
        <CardTitle className={`text-${color}`}>{number}</CardTitle>
      </div>
      <Progress value={value} color={color} style={{ height: '8px' }} />
      <CardText tag="div" className="d-flex justify-content-between">
        <Typography tag="span" className="text-left text-muted small">
          {label}
        </Typography>
        <Typography tag="span" className="text-right text-muted small">
          {value}%
        </Typography>
      </CardText>
    </Card>
  );
};

NumberWidget.propTypes = {
  title: PropTypes.string.isRequired,
  subtitle: PropTypes.string,
  number: PropTypes.oneOfType([
    PropTypes.string.isRequired,
    PropTypes.number.isRequired,
  ]),
  color: PropTypes.oneOf([
    'primary',
    'secondary',
    'success',
    'info',
    'warning',
    'danger',
    'light',
    'dark',
  ]),
  progress: PropTypes.shape({
    value: PropTypes.number,
    label: PropTypes.string,
  }),
} as React.ValidationMap<NumberWidgetProps>;

NumberWidget.defaultProps = {
  title: '',
  subtitle: '',
  number: 0,
  color: 'primary',
  progress: {
    value: 0,
    label: '',
  },
};

import React from 'react';
import PropTypes from '@/utils/propTypes';

import bn from '@/utils/bemnames';

import { Breadcrumb, BreadcrumbItem } from 'reactstrap';

import { Typography } from '@/components/Typography';

const bem = bn.create('page');

export interface PageProps
  extends Omit<
    React.DetailedHTMLProps<
      React.HTMLAttributes<HTMLDivElement>,
      HTMLDivElement
    >,
    'title'
  > {
  tag?: React.ElementType;
  title?: string | React.ReactElement;
  className?: string;
  breadcrumbs: {
    name: string;
    active: boolean;
  }[];
}

export const Page: React.FunctionComponent<PageProps> = ({
  title = '',
  breadcrumbs,
  tag: Tag = 'div',
  className,
  children,
  ...restProps
}) => {
  const classes = bem.b('px-3', className);

  return (
    <Tag className={classes} {...restProps}>
      <div className={bem.e('header')}>
        {title && typeof title === 'string' ? (
          <Typography type="h1" className={bem.e('title')}>
            {title}
          </Typography>
        ) : (
          title
        )}
        {breadcrumbs && (
          <Breadcrumb className={bem.e('breadcrumb')}>
            <BreadcrumbItem>Home</BreadcrumbItem>
            {breadcrumbs.length &&
              breadcrumbs.map(({ name, active }, index) => (
                <BreadcrumbItem key={index} active={active}>
                  {name}
                </BreadcrumbItem>
              ))}
          </Breadcrumb>
        )}
      </div>
      {children}
    </Tag>
  );
};

Page.propTypes = {
  tag: PropTypes.component,
  title: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
  className: PropTypes.string,
  children: PropTypes.node,
  breadcrumbs: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string,
      active: PropTypes.bool,
    }),
  ),
} as React.ValidationMap<PageProps>;

Page.defaultProps = {
  tag: 'div',
  title: '',
};

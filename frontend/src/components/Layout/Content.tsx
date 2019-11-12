import React from 'react';

import bn from '@/utils/bemnames';

import { Container, ContainerProps } from 'reactstrap';

export interface ContentProps extends ContainerProps {
  tag?: React.ReactType;
  className?: string;
}

export const Content: React.FunctionComponent<ContentProps> = ({
  tag: Tag = Container,
  className,
  ...restProps
}) => {
  const bem = bn.create('content');
  const classes = bem.b(className);

  return <Tag className={classes} {...restProps} />;
};

Content.defaultProps = {
  tag: Container,
};

import React from 'react';

import { Content } from '@/components/Layout';

export const EmptyLayout: React.FunctionComponent<
  React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement>
> = ({ children, ...restProps }) => (
  <main className="cr-app bg-light" {...restProps}>
    <Content fluid>{children}</Content>
  </main>
);

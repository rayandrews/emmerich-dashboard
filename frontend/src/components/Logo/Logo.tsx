import React from 'react';

import logo200Image from '@/assets/img/logo/logo_200.png';

export interface LogoProps
  extends React.DetailedHTMLProps<
    React.HTMLAttributes<HTMLImageElement>,
    HTMLImageElement
  > {}

export const Logo: React.FunctionComponent<LogoProps> = props => {
  return (
    <div className="text-center pb-4">
      <img
        src={logo200Image}
        className="rounded"
        style={{ width: 60, height: 60, cursor: 'pointer' }}
        alt="logo"
        {...props}
      />
    </div>
  );
};

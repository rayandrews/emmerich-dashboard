import React from 'react';

export const SourceLink: React.FunctionComponent<
  Omit<
    React.DetailedHTMLProps<
      React.HTMLAttributes<HTMLAnchorElement>,
      HTMLAnchorElement
    >,
    'href' | 'target' | 'rel'
  >
> = props => {
  /* eslint-disable jsx-a11y/anchor-has-content */
  return (
    <a
      href={process.env.REACT_APP_SOURCE_URL}
      target="_blank"
      rel="noopener noreferrer"
      {...props}
    />
  );
};

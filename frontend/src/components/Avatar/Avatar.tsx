import React from 'react';
import PropTypes from '@/utils/propTypes';

import classNames from 'classnames';
import { ClassValue } from 'classnames/types';

import userImage from '@/assets/img/users/100_4.jpg';

// extends React.DetailedHTMLProps<
//   React.HTMLAttributes<HTMLImageElement>,
//   HTMLImageElement
// >

export interface AvatarProps {
  rounded?: boolean;
  circle?: boolean;
  size?: string | number;
  src?: string;
  style?: object;
}

export interface AvatarTagProps<P extends object> extends AvatarProps {
  // tag: React.ComponentProps<typeof React.Component>;
  tag?: React.ComponentType<P> | React.ElementType<any> | any;
  className?: ClassValue;
}

// export function Avatar<P extends object>({ rounded = false,
//   circle = true,
//   src,
//   size = 40,
//   tag: Tag = 'img',
//   className,
//   style = {},
//   ...restProps
// }: AvatarTagProps<P>): React.FC<AvatarTagProps<P>> {
//   const classes = classNames({ 'rounded-circle': circle, rounded }, className);
//   return (
//     <Tag
//       src={src}
//       style={{ width: size, height: size, ...style }}
//       className={classes}
//       {...restProps}
//     />
//   );
// }

export const Avatar = <P extends object>({
  rounded = false,
  circle = true,
  src,
  size = 40,
  tag: Tag = 'img',
  className,
  style = {},
  ...restProps
}: AvatarTagProps<P> & P): React.ReactElement<P> => {
  const classes = classNames({ 'rounded-circle': circle, rounded }, className);
  return (
    <Tag
      src={src}
      style={{ width: size, height: size, ...style }}
      className={classes}
      {...(restProps as P)}
    />
  );
};

Avatar.propTypes = {
  tag: PropTypes.component,
  rounded: PropTypes.bool,
  circle: PropTypes.bool,
  size: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  src: PropTypes.string,
  style: PropTypes.object,
} as React.ValidationMap<AvatarProps>;

Avatar.defaultProps = {
  tag: 'img',
  rounded: false,
  circle: true,
  size: 40,
  src: userImage,
  style: {},
};

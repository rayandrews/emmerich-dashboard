import React from 'react';

import classNames from 'classnames';

import { Badge, BadgeProps } from 'reactstrap';

const positionMap = {
  'top-right': {
    top: -3,
    right: -3,
  },
  'top-left': {
    top: -3,
    left: -3,
  },
  'bottom-left': {
    bottom: -3,
    left: -3,
  },
  'bottom-right': {
    bottom: -3,
    right: -3,
  },
};

const sizeMap = {
  xs: {
    width: 10,
    height: 10,
  },
  sm: {
    width: 15,
    height: 15,
  },
  md: {
    width: 20,
    height: 20,
  },
  lg: {
    width: 25,
    height: 25,
  },
  xl: {
    width: 30,
    height: 30,
  },
};

export interface WithBadgeConfigs extends BadgeProps {
  position?: string;
  size?: string;
  style?: object;
  className?: string;
}

export interface WithBadgeProps {
  tag?: any;
}

export function withBadge({
  position = 'bottom-right',
  size = 'sm',
  style = {},
  className,
  ...restBadgeProps
}: WithBadgeConfigs = {}): <P extends object>(
  WrappedComponent: React.ComponentType<P>,
) => React.ComponentType<P> {
  return <P extends WithBadgeProps>(
    WrappedComponent: React.ComponentType<P>,
  ) => {
    const BadgedComponent: React.FunctionComponent<P> = ({
      tag: Tag = 'div',
      ...restProps
    }) => (
      <Tag className="d-inline-block position-relative">
        <WrappedComponent {...(restProps as any)} />
        <Badge
          className={classNames('position-absolute', className)}
          style={{
            ...positionMap[position],
            ...sizeMap[size],
            borderRadius: '50%',
            border: '2px solid #fff',
            ...style,
          }}
          {...restBadgeProps}
        />
      </Tag>
    );

    return BadgedComponent;
  };
}

// export const withBadge = ({
//   position = 'bottom-right',
//   size = 'sm',
//   style = {},
//   className,
//   ...restBadgeProps
// }: WithBadgeConfigs) => <P extends {}>(
//   WrappedComponent: React.ComponentType<P>,
// ) => ({ tag: Tag = 'div', ...restProps }: WithBadgeProps & P) => {
//   return (
//     <Tag className="d-inline-block position-relative">
//       <WrappedComponent {...restProps} />
//       <Badge
//         className={classNames('position-absolute', className)}
//         style={{
//           ...positionMap[position],
//           ...sizeMap[size],
//           borderRadius: '50%',
//           border: '2px solid #fff',
//           ...style,
//         }}
//         {...restBadgeProps}
//       />
//     </Tag>
//   );
// };

// export function withBadge({
//   position = 'bottom-right',
//   size = 'sm',
//   style = {},
//   className,
//   ...restBadgeProps
// }: WithBadgeConfigs): <P extends object>(
//   WrappedComponent: React.ComponentType<P>,
// ) => React.ReactNode {
//   return <P extends object>(WrappedComponent: React.ComponentType<P>) =>
//     ({ tag: Tag, ...restProps }: WithBadgeProps & P) =>
//     <Tag className="d-inline-block position-relative">
//       <WrappedComponent {...restProps} />
//       <Badge
//         className={classNames('position-absolute', className)}
//         style={{
//           ...positionMap[position],
//           ...sizeMap[size],
//           borderRadius: '50%',
//           border: '2px solid #fff',
//           ...style,
//         }}
//         {...restBadgeProps}
//       />
//     </Tag>
//   );
// }

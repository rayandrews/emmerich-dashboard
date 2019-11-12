import React, { Fragment } from 'react';
import PropTypes from '@/utils/propTypes';

import { UncontrolledTooltip } from 'reactstrap';

import { Avatar, AvatarProps } from '@/components/Avatar';

export interface HorizontalAvatarListProps
  extends React.DetailedHTMLProps<
    React.HTMLAttributes<HTMLDivElement>,
    HTMLDivElement
  > {
  tag?: React.ReactType;
  avatars?: {
    avatar: string;
    name?: string;
  }[];
  avatarProps: Omit<AvatarProps, 'src'>;
  reversed?: boolean;
}

export const HorizontalAvatarList: React.FunctionComponent<
  HorizontalAvatarListProps
> = ({
  tag: Tag = 'div',
  avatars = [],
  avatarProps = {},
  reversed = false,
  ...restProps
}) => {
  let leng = reversed ? avatars.length + 1 : 1;
  const count = reversed ? () => leng-- : () => leng++;

  return (
    <Tag className="d-flex align-items-center" {...restProps}>
      {avatars &&
        avatars.map(({ avatar, name }, i) => {
          const index = count();
          const isNotFirstItem = !(i === 0);

          return (
            <Fragment key={index}>
              <div />
              <Avatar
                {...avatarProps}
                id={`HorizontalAvatarList-avatar-${index}`}
                src={avatar}
                style={{
                  zIndex: index,
                  border: '3px solid #fff',
                  marginLeft: `${isNotFirstItem && -20}`,
                  marginBottom: '20px',
                  marginTop: '20px',
                }}
              />

              {!!name && (
                <UncontrolledTooltip
                  delay={{ show: 0, hide: 0 }}
                  target={`HorizontalAvatarList-avatar-${index}`}
                >
                  {name}
                </UncontrolledTooltip>
              )}
            </Fragment>
          );
        })}
    </Tag>
  );
};

HorizontalAvatarList.propTypes = {
  tag: PropTypes.node,
  avatars: PropTypes.arrayOf(
    PropTypes.shape({
      avatar: PropTypes.string.isRequired,
      name: PropTypes.string,
    }),
  ).isRequired,
  avatarProps: PropTypes.object,
  reversed: PropTypes.bool,
} as React.ValidationMap<HorizontalAvatarListProps>;

HorizontalAvatarList.defaultProps = {
  tag: 'div',
  avatars: [],
  avatarProps: {},
  reversed: false,
};

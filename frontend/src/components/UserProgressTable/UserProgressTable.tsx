import React from 'react';
import PropTypes from '@/utils/propTypes';

import { Table, Progress, TableProps } from 'reactstrap';

import { Avatar } from '@/components/Avatar';

import { withBadge } from '@/hocs/withBadge';

export const AvatarWithBadge = withBadge({
  position: 'bottom-right',
  color: 'success',
})(Avatar);

export interface UserProgressTableProps extends TableProps {
  headers: React.ReactNode[];
  usersData: {
    avatar: string;
    name?: string;
    date?: Date | string;
    progress?: string | number;
  }[];
}

export const UserProgressTable: React.FunctionComponent<
  UserProgressTableProps
> = ({ headers = [], usersData, ...restProps }) => {
  return (
    <Table responsive hover {...restProps}>
      <thead>
        <tr className="text-capitalize align-middle text-center">
          {headers.map((item, index) => (
            <th key={index}>{item}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {usersData.map(({ avatar, name, date, progress }, index) => (
          <tr key={index}>
            <td className="align-middle text-center">
              <AvatarWithBadge src={avatar} />
            </td>
            <td className="align-middle text-center">{name}</td>
            <td className="align-middle text-center">{date}</td>
            <td className="align-middle text-center">
              <Progress value={progress} style={{ height: 5 }} />
            </td>
            <td className="align-middle text-center">{progress}%</td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
};

UserProgressTable.propTypes = {
  headers: PropTypes.node,
  usersData: PropTypes.arrayOf(
    PropTypes.shape({
      avatar: PropTypes.string,
      name: PropTypes.string,
      date: PropTypes.date,
    }),
  ),
} as React.WeakValidationMap<UserProgressTableProps>;

UserProgressTable.defaultProps = {
  headers: [],
  usersData: [],
};

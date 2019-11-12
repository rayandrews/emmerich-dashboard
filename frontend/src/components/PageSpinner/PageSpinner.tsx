import React from 'react';
import PropTypes from '@/utils/propTypes';

import { Spinner } from 'reactstrap';

import { EmptyLayout } from '@/components/Layout';

export const PageSpinner = ({ color = 'primary' }) => {
  return (
    <EmptyLayout>
      <div className="cr-page-spinner">
        <Spinner color={color} />
      </div>
    </EmptyLayout>
  );
};

PageSpinner.propTypes = {
  color: PropTypes.oneOf([
    'primary',
    'secondary',
    'success',
    'danger',
    'warning',
    'info',
    'light',
    'dark',
  ]),
};

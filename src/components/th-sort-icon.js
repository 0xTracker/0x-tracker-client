import PropTypes from 'prop-types';
import React from 'react';

import { SortAscendingIcon, SortDescendingIcon } from './icons';

const ThSortIcon = ({ direction, ...otherProps }) => {
  if (direction === 'asc') {
    return <SortAscendingIcon {...otherProps} />;
  }

  return <SortDescendingIcon {...otherProps} />;
};

ThSortIcon.propTypes = {
  direction: PropTypes.string.isRequired,
};

export default ThSortIcon;

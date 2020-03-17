import {
  FilterList,
  Filter1,
  Filter2,
  Filter3,
  Filter4,
} from 'styled-icons/material';
import PropTypes from 'prop-types';
import React from 'react';

const iconComponents = {
  0: FilterList,
  1: Filter1,
  2: Filter2,
  3: Filter3,
  4: Filter4,
};

const FilterIcon = ({ appliedFilterCount, ...otherProps }) => {
  const IconComponent = iconComponents[appliedFilterCount];

  if (IconComponent === undefined) {
    throw new Error(
      `appliedFilterCount of ${appliedFilterCount} is not supported`,
    );
  }

  return <IconComponent {...otherProps} />;
};

FilterIcon.propTypes = {
  appliedFilterCount: PropTypes.number,
};

FilterIcon.defaultProps = {
  appliedFilterCount: 0,
};

export default FilterIcon;

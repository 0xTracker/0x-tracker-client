import { FilterList } from 'styled-icons/material/FilterList';
import { Filter1 } from 'styled-icons/material/Filter1';
import { Filter2 } from 'styled-icons/material/Filter2';
import { Filter3 } from 'styled-icons/material/Filter3';
import { Filter4 } from 'styled-icons/material/Filter4';
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

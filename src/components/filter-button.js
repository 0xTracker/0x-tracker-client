import PropTypes from 'prop-types';
import React from 'react';
import styled from 'styled-components';

import { FilterIcon } from './icons';
import { colors } from '../styles/constants';

const StyledFilterButton = styled.button`
  align-items: center;
  background: white;
  border: 1px solid ${colors.mischka};
  border-radius: 0.25rem;
  color: currentColor;
  display: flex;
  justify-content: center;
  padding: 0;

  &:hover {
    background-color: ${colors.mischka};
  }
`;

const FilterButton = ({ appliedFilterCount, ...otherProps }) => (
  <StyledFilterButton {...otherProps} type="button">
    <FilterIcon
      appliedFilterCount={appliedFilterCount}
      height={20}
      width={20}
    />
  </StyledFilterButton>
);

FilterButton.propTypes = {
  appliedFilterCount: PropTypes.number,
};

FilterButton.defaultProps = {
  appliedFilterCount: undefined,
};

export default FilterButton;

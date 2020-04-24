import PropTypes from 'prop-types';
import React from 'react';
import styled from 'styled-components';

import { FilterIcon } from './icons';
import { COLORS } from '../styles/constants';

const StyledFilterButton = styled.button`
  align-items: center;
  background: ${COLORS.NEUTRAL.MYSTIC_300};
  border: none;
  border-radius: 0.25rem;
  color: currentColor;
  display: flex;
  height: 38px;
  width: 38px;
  flex-shrink: 0;
  flex-grow: 0;
  justify-content: center;
  padding: 0;
  position: relative;

  &:hover {
    background: ${COLORS.NEUTRAL.MYSTIC_400};
  }
`;

const Indicator = styled.div`
  align-items: center;
  background: ${COLORS.ACCENT.ANZAC_400};
  border-radius: 1em;
  color: ${COLORS.ACCENT.ANZAC_1000};
  display: flex;
  font-size: 0.7rem;
  font-weight: bold;
  justify-content: center;
  position: absolute;
  right: -0.5rem;
  top: -0.5rem;
  width: 1.2rem;
  height: 1.2rem;
`;

const FilterButton = ({ indicatorValue, ...otherProps }) => (
  <StyledFilterButton {...otherProps} type="button">
    {indicatorValue > 0 ? <Indicator>{indicatorValue}</Indicator> : null}
    <FilterIcon height={22} width={22} />
  </StyledFilterButton>
);

FilterButton.propTypes = {
  indicatorValue: PropTypes.number,
};

FilterButton.defaultProps = {
  indicatorValue: 0,
};

export default FilterButton;

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

const FilterButton = props => (
  <StyledFilterButton {...props} type="button">
    <FilterIcon height={22} width={22} />
  </StyledFilterButton>
);

export default FilterButton;

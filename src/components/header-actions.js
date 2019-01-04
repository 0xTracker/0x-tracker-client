import { Cog as SettingsIcon } from 'styled-icons/fa-solid/Cog.cjs';
import React from 'react';
import styled from 'styled-components';

import { colors } from '../styles/constants';
import SearchIcon from './search-icon';

const ActionButton = styled.button`
  background: none;
  border: none;
  border-radius: 3px;
  cursor: pointer;
  display: flex;
  justify-content: center;
  padding: 8px 10px;
  margin-right: 8px;

  &:hover {
    background: ${colors.athensGray};
  }

  &:last-child {
    margin: 0;
  }
`;

const HeaderActions = () => (
  <div css="display: flex;">
    <ActionButton title="Show settings">
      <SettingsIcon color="currentColor" height={22} width={22} />
    </ActionButton>
    <ActionButton title="Show search">
      <SearchIcon color="currentColor" height={22} width={22} />
    </ActionButton>
  </div>
);

export default HeaderActions;

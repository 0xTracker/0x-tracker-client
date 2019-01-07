import { Cog as SettingsIcon } from 'styled-icons/fa-solid/Cog.cjs';
import React, { useState } from 'react';
import styled from 'styled-components';

import { colors } from '../styles/constants';
import Dialog from './dialog';
import SearchIcon from './search-icon';

const ActionButton = styled.button`
  background: none;
  border: none;
  border-radius: 0.25rem;
  cursor: pointer;
  display: flex;
  justify-content: center;
  padding: 0.75rem 0.75rem;
  margin-right: 0.5rem;

  &:hover {
    background: ${colors.athensGray};
  }

  &:last-child {
    margin: 0;
  }
`;

const HeaderActions = () => {
  const [settingsVisible, updateSettingsVisible] = useState(false);

  const showSettings = () => updateSettingsVisible(true);
  const hideSettings = () => updateSettingsVisible(false);

  return (
    <>
      <div css="display: flex;">
        <ActionButton onClick={showSettings} title="Show settings">
          <SettingsIcon color="currentColor" height={22} width={22} />
        </ActionButton>
        <ActionButton title="Show search">
          <SearchIcon color="currentColor" height={22} width={22} />
        </ActionButton>
      </div>
      {settingsVisible ? (
        <Dialog onClose={hideSettings} title="Settings">
          Hello World
        </Dialog>
      ) : null}
    </>
  );
};

export default HeaderActions;

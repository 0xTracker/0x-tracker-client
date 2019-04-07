import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

import { colors } from '../styles/constants';
import { NotificationsIcon, SearchIcon, SettingsIcon } from './icons';
import HeaderSearch from './header-search';
import useSettingsDialog from '../features/preferences/hooks/use-settings-dialog';

const ActionButton = styled.button`
  align-items: center;
  background: none;
  border: none;
  border-radius: 0.25rem;
  cursor: pointer;
  display: flex;
  height: 100%;
  justify-content: center;
  padding: 0 0.75rem;
  margin-right: 0.5rem;

  &:hover {
    background: ${colors.athensGray};
  }

  &:last-child {
    margin: 0;
  }
`;

const NotificationsButton = styled(ActionButton)`
  position: relative;

  #HW_badge_cont {
    position: absolute;
    right: 0;
    top: -3px;
  }
`;

const HeaderActions = () => {
  const [searchVisible, setSearchVisibility] = useState(false);
  const settingsDialog = useSettingsDialog();
  const hideSearch = () => setSearchVisibility(false);

  useEffect(() => {
    if (typeof Headway !== 'undefined') {
      Headway.init({
        account: 'xGOQOx',
        selector: '.headway',
        trigger: '.headway',
      });
    }
  }, []);

  return searchVisible ? (
    <HeaderSearch onBlur={hideSearch} onSearch={hideSearch} />
  ) : (
    <div css="display: flex; height: 100%;">
      <NotificationsButton className="headway">
        <NotificationsIcon color="currentColor" height={22} width={22} />
      </NotificationsButton>
      <ActionButton onClick={() => settingsDialog.show()} title="Settings">
        <SettingsIcon color="currentColor" height={22} width={22} />
      </ActionButton>
      <ActionButton onClick={() => setSearchVisibility(true)} title="Search">
        <SearchIcon color="currentColor" height={22} width={22} />
      </ActionButton>
    </div>
  );
};

export default HeaderActions;

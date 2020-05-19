import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

import { COLORS } from '../../../styles/constants';
import {
  DonateIcon,
  NotificationsIcon,
  SearchIcon,
  SettingsIcon,
} from '../../../components/icons';
import HeaderSearch from './header-search';
import Link from '../../../components/link';
import useSettingsDialog from '../../preferences/hooks/use-settings-dialog';

const ActionButton = styled.button`
  align-items: center;
  background: none;
  border: none;
  border-radius: 0.25rem;
  color: inherit;
  cursor: pointer;
  display: flex;
  justify-content: center;
  margin: 0 0.5rem 0 0;
  padding: 0.5rem 0.75rem;

  &:hover {
    background: white;
    color: ${COLORS.PRIMARY.SCAMPI_900};
  }

  &:last-child {
    margin: 0;
  }
`;

const NotificationsButton = styled(ActionButton)`
  position: relative;

  #HW_badge_cont {
    position: absolute;
    right: 3px;
    top: -3px;
  }
`;

const HeaderActions = () => {
  const [searchVisible, setSearchVisibility] = useState(false);
  const settingsDialog = useSettingsDialog();
  const hideSearch = () => setSearchVisibility(false);

  useEffect(() => {
    if (typeof Headway !== 'undefined' && !searchVisible) {
      Headway.init({
        account: 'xGOQOx',
        selector: '.headway',
        trigger: '.headway',
      });
    }
  }, [searchVisible]);

  return searchVisible ? (
    <HeaderSearch onBlur={hideSearch} onSearch={hideSearch} />
  ) : (
    <div css="display: flex; align-items: center;">
      <NotificationsButton className="headway">
        <NotificationsIcon color="currentColor" height={26} width={26} />
      </NotificationsButton>
      <ActionButton
        as={Link}
        href="https://www.buymeacoffee.com/0xTracker"
        onClick={() => {
          if (window.fathom) {
            window.fathom.trackGoal('MYB7SWUU', 0);
          }
        }}
        title="Help support 0x Tracker development with a donation"
      >
        <DonateIcon color="currentColor" height={22} width={22} />
      </ActionButton>
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

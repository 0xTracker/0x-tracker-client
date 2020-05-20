import React, { useEffect } from 'react';
import styled from 'styled-components';

import {
  DonateIcon,
  NotificationsIcon,
  SettingsIcon,
} from '../../../components/icons';
import { COLORS } from '../../../styles/constants';
import Link from '../../../components/link';
import useSettingsDialog from '../../preferences/hooks/use-settings-dialog';

const ActionButton = styled.button`
  align-items: center;
  background: none;
  border: none;
  background: ${COLORS.NEUTRAL.MYSTIC_100};
  border-radius: 0.25rem;
  box-shadow: 0px 1px 3px rgba(126, 142, 177, 0.2);
  color: ${COLORS.PRIMARY.SCAMPI_800};
  cursor: pointer;
  display: flex;
  justify-content: center;
  margin: 0 12px 0 0;
  height: 100%;
  width: 50px;

  &:hover {
    background: ${COLORS.NEUTRAL.MYSTIC_200};
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
  const settingsDialog = useSettingsDialog();

  useEffect(() => {
    if (typeof Headway !== 'undefined') {
      Headway.init({
        account: 'xGOQOx',
        selector: '.headway',
        trigger: '.headway',
      });
    }
  });

  return (
    <div css="display: flex; align-items: center; height: 100%; padding: 14px 0 14px;">
      <NotificationsButton className="headway">
        <NotificationsIcon color="currentColor" height={24} width={24} />
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
        <DonateIcon color="currentColor" height={20} width={20} />
      </ActionButton>
      <ActionButton onClick={() => settingsDialog.show()} title="Settings">
        <SettingsIcon color="currentColor" height={20} width={20} />
      </ActionButton>
    </div>
  );
};

export default HeaderActions;

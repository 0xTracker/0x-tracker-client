import React from 'react';
import styled from 'styled-components';

import { GitHubIcon, SettingsIcon } from '../../../components/icons';
import { COLORS } from '../../../styles/constants';
import Link from '../../../components/link';
import useSettingsDialog from '../../preferences/hooks/use-settings-dialog';

const ActionButton = styled.button`
  align-items: center;
  background: none;
  border: none;
  border-radius: 0.25rem;
  color: ${COLORS.PRIMARY.SCAMPI_800};
  cursor: pointer;
  display: flex;
  justify-content: center;
  margin: 0 0 0 0;
  padding: 0;
  height: 100%;
  width: 50px;

  &:hover {
    background: ${COLORS.NEUTRAL.MYSTIC_400};
  }

  &:last-child {
    margin: 0;
  }
`;

const HeaderActions = () => {
  const settingsDialog = useSettingsDialog();

  return (
    <div css="display: flex; align-items: center; height: 100%; padding: 14px 0 14px;">
      <ActionButton
        as={Link}
        href="https://github.com/0xTracker"
        title="0x Tracker on GitHub"
      >
        <GitHubIcon color="currentColor" height={24} width={24} />
      </ActionButton>
      <ActionButton onClick={() => settingsDialog.show()} title="Settings">
        <SettingsIcon color="currentColor" height={24} width={24} />
      </ActionButton>
    </div>
  );
};

export default HeaderActions;

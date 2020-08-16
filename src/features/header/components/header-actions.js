import React from 'react';
import styled from 'styled-components';

import { SettingsIcon } from '../../../components/icons';
import { COLORS } from '../../../styles/constants';
import useSettingsDialog from '../../preferences/hooks/use-settings-dialog';

const ActionButton = styled.button`
  align-items: center;
  background: none;
  border: none;
  ${'' /* background: ${COLORS.NEUTRAL.MYSTIC_400}; */}
  border-radius: 0.25rem;
  ${'' /* box-shadow: 0px 1px 3px rgba(126, 142, 177, 0.2); */}
  color: ${COLORS.PRIMARY.SCAMPI_800};
  cursor: pointer;
  display: flex;
  justify-content: center;
  margin: 0 12px 0 0;
  padding: 0;
  height: 100%;
  width: 50px;

  &:hover {
    background: ${COLORS.NEUTRAL.MYSTIC_400};
    ${'' /* background: ${COLORS.NEUTRAL.MYSTIC_500}; */}
  }

  &:last-child {
    margin: 0;
  }
`;

const HeaderActions = () => {
  const settingsDialog = useSettingsDialog();

  return (
    <div css="display: flex; align-items: center; height: 100%; padding: 14px 0 14px;">
      <ActionButton onClick={() => settingsDialog.show()} title="Settings">
        <SettingsIcon color="currentColor" height={20} width={20} />
      </ActionButton>
    </div>
  );
};

export default HeaderActions;

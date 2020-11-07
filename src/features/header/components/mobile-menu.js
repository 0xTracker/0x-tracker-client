import PropTypes from 'prop-types';
import React from 'react';
import styled from 'styled-components';

import { COLORS } from '../../../styles/constants';
import DisableBodyScroll from '../../../components/disable-body-scroll';
import MobileNavigation from './mobile-navigation';
import useSettingsDialog from '../../preferences/hooks/use-settings-dialog';
import { SettingsIcon } from '../../../components/icons';

const Wrapper = styled.div`
  background-color: ${COLORS.PRIMARY.SCAMPI_1000};
  color: ${COLORS.PRIMARY.SCAMPI_100};
  height: calc(100vh - 70px);
  padding: 1rem 0 0 0;
  position: absolute;
  top: 70px;
  width: 100vw;
  z-index: 100;
`;

const SettingsButton = styled.button`
  background: none;
  border: none;
  bottom: 1rem;
  color: inherit;
  padding: 0;
  position: absolute;
  right: 1rem;
`;

const MobileMenu = ({ onNavigate }) => {
  const settingsDialog = useSettingsDialog();

  return (
    <>
      <DisableBodyScroll />
      <Wrapper aria-label="Menu" aria-modal role="dialog">
        <MobileNavigation onNavigate={onNavigate} />
        <SettingsButton
          onClick={() => {
            settingsDialog.show();
            onNavigate();
          }}
        >
          <SettingsIcon />
        </SettingsButton>
      </Wrapper>
    </>
  );
};

MobileMenu.propTypes = {
  onNavigate: PropTypes.func.isRequired,
};

export default MobileMenu;

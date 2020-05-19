import { Portal } from 'react-portal';
import PropTypes from 'prop-types';
import React from 'react';
import styled from 'styled-components';

import { COLORS } from '../../../styles/constants';
import DisableBodyScroll from '../../../components/disable-body-scroll';
import MobileMenuHeader from './mobile-menu-header';
import MobileNavigation from './mobile-navigation';

const StyledMobileMenu = styled.div`
  background-color: ${COLORS.PRIMARY.SCAMPI_1000};
  color: white;
  height: 100vh;
  padding: 1rem 0 0 0;
  position: absolute;
  top: 0;
  width: 100vw;
  z-index: 100;
`;

const MobileMenu = ({ onClose, onNavigate }) => (
  <Portal>
    <DisableBodyScroll />
    <StyledMobileMenu aria-label="Menu" aria-modal role="dialog">
      <MobileMenuHeader onClose={onClose} onNavigate={onNavigate} />
      <MobileNavigation onNavigate={onNavigate} />
    </StyledMobileMenu>
  </Portal>
);

MobileMenu.propTypes = {
  onClose: PropTypes.func.isRequired,
  onNavigate: PropTypes.func.isRequired,
};

export default MobileMenu;

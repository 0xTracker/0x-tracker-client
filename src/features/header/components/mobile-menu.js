import PropTypes from 'prop-types';
import React from 'react';
import styled from 'styled-components';

import { COLORS } from '../../../styles/constants';
import DisableBodyScroll from '../../../components/disable-body-scroll';
import MobileNavigation from './mobile-navigation';

const Wrapper = styled.div`
  background-color: ${COLORS.PRIMARY.SCAMPI_1000};
  color: white;
  height: calc(100vh - 70px);
  padding: 1rem 0 0 0;
  position: absolute;
  top: 70px;
  width: 100vw;
  z-index: 100;
`;

const MobileMenu = ({ onNavigate }) => (
  <>
    <DisableBodyScroll />
    <Wrapper aria-label="Menu" aria-modal role="dialog">
      <MobileNavigation onNavigate={onNavigate} />
    </Wrapper>
  </>
);

MobileMenu.propTypes = {
  onNavigate: PropTypes.func.isRequired,
};

export default MobileMenu;

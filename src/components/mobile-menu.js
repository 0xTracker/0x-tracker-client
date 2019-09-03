import { Portal } from 'react-portal';
import PropTypes from 'prop-types';
import React from 'react';
import styled from 'styled-components';

import { colors } from '../styles/constants';
import { URL } from '../constants';
import CloseIcon from './icons/close-icon';
import DisableBodyScroll from './disable-body-scroll';
import Link from './link';
import logoImage from '../assets/images/logo-dark.svg';
import MobileNavigation from './mobile-navigation';
import MobileSearchForm from './mobile-search-form';

const StyledMobileMenu = styled.div`
  background-color: ${colors.violet};
  color: ${colors.white};
  height: 100vh;
  padding: 1rem 1rem 0 1rem;
  position: absolute;
  top: 0;
  width: 100vw;
  z-index: 100;
`;

const CloseButton = styled.button`
  background: none;
  border: none;
  color: currentColor;
  cursor: pointer;
  margin: 0;
  padding: 0;
  position: absolute;
  top: 1.2rem;
  right: 0.6rem;
`;

const Logo = styled.img`
  height: 2.5rem;
`;

const MobileMenu = ({ onClose, onNavigate, onSearch }) => (
  <Portal>
    <DisableBodyScroll />
    <StyledMobileMenu aria-label="Menu" aria-modal role="dialog">
      <div css="height: 4.5rem">
        <CloseButton autoFocus onClick={onClose} title="Close" type="button">
          <CloseIcon width={27} />
        </CloseButton>
        <Link href={URL.DASHBOARD} onClick={onNavigate}>
          <Logo src={logoImage} title="0x Tracker" />
        </Link>
      </div>
      <MobileSearchForm onSearch={onSearch} />
      <MobileNavigation onClick={onNavigate} />
    </StyledMobileMenu>
  </Portal>
);

MobileMenu.propTypes = {
  onClose: PropTypes.func.isRequired,
  onNavigate: PropTypes.func.isRequired,
  onSearch: PropTypes.func.isRequired,
};

export default MobileMenu;

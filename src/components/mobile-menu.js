import PropTypes from 'prop-types';
import React from 'react';
import styled from 'styled-components';

import { colors } from '../styles/constants';
import { URL } from '../constants';
import CloseIcon from './close-icon';
import DisableBodyScroll from './disable-body-scroll';
import Link from './link';
import logoImage from '../assets/images/logo-dark.svg';
import MobileNavigation from './mobile-navigation';
import MobileSearchForm from './mobile-search-form';

const StyledMobileMenu = styled.ul`
  background-color: ${colors.violet};
  color: ${colors.white};
  height: 100vh;
  padding: 5rem 0 0;
  position: absolute;
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
  top: 1rem;
  right: 1rem;
`;

const Logo = styled.img`
  position: absolute;
  top: 1rem;
  left: 1rem;
  width: 8rem;
`;

const MobileMenu = ({ onClose, onNavigate, onSearch }) => (
  <>
    <DisableBodyScroll />
    <StyledMobileMenu aria-label="Menu" aria-modal role="dialog">
      <CloseButton autoFocus onClick={onClose} title="Close" type="button">
        <CloseIcon width={32} />
      </CloseButton>
      <Link href={URL.DASHBOARD} onClick={onNavigate}>
        <Logo src={logoImage} title="0x Tracker" />
      </Link>
      <MobileSearchForm onSearch={onSearch} />
      <MobileNavigation onClick={onNavigate} />
    </StyledMobileMenu>
  </>
);

MobileMenu.propTypes = {
  onClose: PropTypes.func.isRequired,
  onNavigate: PropTypes.func.isRequired,
  onSearch: PropTypes.func.isRequired,
};

export default MobileMenu;

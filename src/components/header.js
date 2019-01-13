import { Bars as MenuIcon } from 'styled-icons/fa-solid/Bars.cjs';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import React, { useState } from 'react';
import styled from 'styled-components';

import { URL } from '../constants';
import { colors } from '../styles/constants';
import { media } from '../styles/util';
import Container from './container';
import HeaderActions from './header-actions';
import Link from './link';
import logoImage from '../assets/images/logo-light.svg';
import MobileMenu from './mobile-menu';
import Navigation from './navigation';
import SettingsDialogProvider from '../features/preferences/components/settings-dialog-provider';

const LogoImage = styled.img`
  height: 2.75rem;
  width: ${props => (props.size === 'small' ? '8rem' : '10rem')};
`;

const MenuButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  padding: 0;
`;

const StyledHeader = styled.header`
  background-color: ${colors.white};
  height: 4rem;
  padding: 1rem 0;

  ${media.greaterThan('lg')`
    height: 4.75rem;
  `}
`;

const Header = ({ screenSize }) => {
  const [mobileMenuState, updateMobileMenuState] = useState('closed');

  const closeMobileMenu = () => {
    updateMobileMenuState('closed');
  };

  const openMobileMenu = () => {
    updateMobileMenuState('open');
  };

  const isMobile = screenSize.greaterThan.md;

  return (
    <SettingsDialogProvider>
      {isMobile || mobileMenuState === 'closed' ? null : (
        <MobileMenu
          onClose={closeMobileMenu}
          onNavigate={closeMobileMenu}
          onSearch={closeMobileMenu}
        />
      )}
      <StyledHeader>
        <Container css="align-items: center; display: flex; justify-content: space-between; height: 100%;">
          <Link href={URL.DASHBOARD}>
            <LogoImage
              alt="0x Tracker"
              size={isMobile ? 'large' : 'small'}
              src={logoImage}
            />
          </Link>
          {isMobile ? (
            <>
              <Navigation css="flex-grow: 1;" />
              <HeaderActions />
            </>
          ) : (
            <MenuButton onClick={openMobileMenu} title="Open menu">
              <MenuIcon height={20} />
            </MenuButton>
          )}
        </Container>
      </StyledHeader>
    </SettingsDialogProvider>
  );
};

Header.propTypes = {
  screenSize: PropTypes.shape({
    greaterThan: PropTypes.shape({
      sm: PropTypes.bool.isRequired,
    }).isRequired,
  }).isRequired,
};

const mapStateToProps = state => ({ screenSize: state.screen });

export default connect(mapStateToProps)(Header);

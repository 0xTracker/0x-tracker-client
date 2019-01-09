import { Bars as MenuIcon } from 'styled-icons/fa-solid/Bars.cjs';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import React, { useState } from 'react';
import styled from 'styled-components';

import { URL } from '../constants';
import { colors } from '../styles/constants';
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
      <header
        css={`
          background-color: ${colors.white};
          height: 4.75rem;
          padding: 1rem 0;
        `}
      >
        <Container css="align-items: center; display: flex; justify-content: space-between; height: 100%;">
          <Link href={URL.DASHBOARD}>
            <LogoImage
              alt="0x Tracker"
              size={isMobile ? 'large' : 'small'}
              src={logoImage}
            />
          </Link>
          {isMobile ? (
            <React.Fragment>
              <Navigation css="flex-grow: 1;" />
              <HeaderActions />
            </React.Fragment>
          ) : (
            <MenuButton onClick={openMobileMenu} title="Open menu">
              <MenuIcon height={24} />
            </MenuButton>
          )}
        </Container>
      </header>
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

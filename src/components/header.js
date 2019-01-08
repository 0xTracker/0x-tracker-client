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

  return (
    <SettingsDialogProvider>
      {screenSize.greaterThan.sm || mobileMenuState === 'closed' ? null : (
        <MobileMenu
          onClose={closeMobileMenu}
          onNavigate={closeMobileMenu}
          onSearch={closeMobileMenu}
        />
      )}
      <header
        css={`
          background-color: ${colors.white};
          padding: 18px 0;
        `}
      >
        <Container css="align-items: center; display: flex; justify-content: space-between;">
          <Link href={URL.DASHBOARD}>
            <LogoImage
              alt="0x Tracker"
              size={screenSize.greaterThan.sm ? 'large' : 'small'}
              src={logoImage}
            />
          </Link>
          {screenSize.greaterThan.sm ? (
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

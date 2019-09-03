import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

import { URL } from '../constants';
import { colors } from '../styles/constants';
import { media } from '../styles/util';
import { MenuIcon, NotificationsIcon } from './icons';
import Container from './container';
import HeaderActions from './header-actions';
import Link from './link';
import logoImage from '../assets/images/logo-dark.svg';
import MobileMenu from './mobile-menu';
import Navigation from './navigation';
import SettingsDialogProvider from '../features/preferences/components/settings-dialog-provider';

const LogoImage = styled.img`
  height: 2.5rem;
`;

const MenuButton = styled.button`
  align-items: center;
  background: none;
  border: none;
  color: ${colors.lavenderGray};
  cursor: pointer;
  display: flex;
  padding: 0;
`;

const StyledHeader = styled.header`
  background-color: ${colors.violet};
  height: 4.5rem;
  padding: 0.75rem 0;

  ${media.greaterThan('md')`
    padding: 0;
  `};
`;

const NotificationsButton = styled(MenuButton)`
  margin-right: 1rem;
  position: relative;

  #HW_badge_cont {
    position: absolute;
    right: -10px;
    top: -13px;
  }
`;

const Header = ({ screenSize }) => {
  const [mobileMenuState, updateMobileMenuState] = useState('closed');

  const closeMobileMenu = () => {
    updateMobileMenuState('closed');
  };

  const openMobileMenu = () => {
    updateMobileMenuState('open');
  };

  useEffect(() => {
    if (typeof Headway !== 'undefined') {
      Headway.init({
        account: 'xGOQOx',
        selector: '.headway',
        trigger: '.headway',
      });
    }
  }, []);

  const isDesktop = screenSize.greaterThan.md;

  return (
    <SettingsDialogProvider>
      {isDesktop || mobileMenuState === 'closed' ? null : (
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
              size={isDesktop ? 'large' : 'small'}
              src={logoImage}
            />
          </Link>
          {isDesktop ? (
            <>
              <Navigation css="flex-grow: 1;" />
              <HeaderActions />
            </>
          ) : (
            <div css="display: flex; align-items: center;">
              <NotificationsButton className="headway">
                <NotificationsIcon height={24} width={24} />
              </NotificationsButton>
              <MenuButton onClick={openMobileMenu} title="Open menu">
                <MenuIcon height={20} />
              </MenuButton>
            </div>
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

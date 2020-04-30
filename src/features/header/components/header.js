import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

import { URL } from '../../../constants';
import { COLORS } from '../../../styles/constants';
import { media } from '../../../styles/util';
import { MenuIcon, NotificationsIcon } from '../../../components/icons';
import { useCurrentBreakpoint } from '../../../responsive-utils';
import Container from '../../../components/container';
import HeaderActions from './header-actions';
import Link from '../../../components/link';
import logoImage from '../../../assets/images/logo-grayscale.svg';
import MobileMenu from './mobile-menu';
import Navigation from './navigation';
import SettingsDialogProvider from '../../preferences/components/settings-dialog-provider';

const LogoImage = styled.img`
  height: 2.6rem;
`;

const MenuButton = styled.button`
  align-items: center;
  background: none;
  border: none;
  color: currentColor;
  cursor: pointer;
  display: flex;
  padding: 0;
`;

const StyledHeader = styled.header`
  background-color: ${COLORS.PRIMARY.SCAMPI_1000};
  color: ${COLORS.PRIMARY.SCAMPI_100};
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

const Header = () => {
  const [mobileMenuState, updateMobileMenuState] = useState('closed');
  const breakpoint = useCurrentBreakpoint();

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

  const isDesktop = breakpoint.greaterThan('md');

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
          <Link href={URL.HOME}>
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

export default Header;

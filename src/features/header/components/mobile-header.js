import { useKey, useLocation } from 'react-use';
import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

import { URL } from '../../../constants';
import { COLORS } from '../../../styles/constants';
import { media } from '../../../styles/util';
import {
  MenuIcon,
  NotificationsIcon,
  SearchIcon,
} from '../../../components/icons';
import { useCurrentBreakpoint } from '../../../responsive-utils';
import Container from '../../../components/container';
import HeaderActions from './header-actions';
import Link from '../../../components/link';
import logoImage from '../../../assets/images/logo-grayscale.svg';
import MobileMenu from './mobile-menu';
import Navigation from './navigation';
import SearchBox from '../../search/components/search-box';
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
  margin-right: 0.5rem;
  position: relative;

  #HW_badge_cont {
    position: absolute;
    right: -10px;
    top: -13px;
  }
`;

const ActionButton = styled.button`
  align-items: center;
  background: none;
  border: none;
  border-radius: 0.25rem;
  color: inherit;
  cursor: pointer;
  display: flex;
  justify-content: center;
  margin: 0 0.5rem 0 0;
  padding: 0.5rem 0.75rem;

  &:last-child {
    margin: 0;
  }
`;

const MobileHeader = () => {
  const location = useLocation();
  const breakpoint = useCurrentBreakpoint();

  const showSearchByDefault =
    breakpoint.greaterThan('xs') && location.pathname === '/';

  const [searchVisible, setSearchVisible] = useState(showSearchByDefault);
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

  const isDesktop = breakpoint.greaterThan('md');

  useKey('/', (event) => {
    event.preventDefault();
    setSearchVisible(true);
  });

  return (
    <SettingsDialogProvider>
      {isDesktop || mobileMenuState === 'closed' ? null : (
        <MobileMenu onClose={closeMobileMenu} onNavigate={closeMobileMenu} />
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
              <HeaderActions
                onSearchClick={() => {
                  setSearchVisible(true);
                }}
                showSearch={location.pathname !== '/'}
              />
            </>
          ) : (
            <div css="display: flex; align-items: center;">
              <NotificationsButton className="headway">
                <NotificationsIcon height={24} width={24} />
              </NotificationsButton>
              {!showSearchByDefault && (
                <ActionButton
                  onClick={() => setSearchVisible(true)}
                  title="Search"
                >
                  <SearchIcon color="currentColor" height={22} width={22} />
                </ActionButton>
              )}
              <MenuButton onClick={openMobileMenu} title="Open menu">
                <MenuIcon height={20} />
              </MenuButton>
            </div>
          )}
        </Container>
      </StyledHeader>
      {searchVisible && (
        <div
          css={`
            background: ${COLORS.NEUTRAL.MYSTIC_300};
            padding: 1rem 0;
          `}
        >
          <Container>
            <SearchBox
              autoFocus={!showSearchByDefault}
              onBlur={() => {
                if (!showSearchByDefault) {
                  setSearchVisible(false);
                }
              }}
            />
          </Container>
        </div>
      )}
    </SettingsDialogProvider>
  );
};

export default MobileHeader;

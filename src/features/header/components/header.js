import { useLocation } from 'react-use';
import React, { useState } from 'react';
import styled from 'styled-components';

import { COLORS } from '../../../styles/constants';
import { MenuIcon, SearchIcon } from '../../../components/icons';
import { useCurrentBreakpoint } from '../../../responsive-utils';
import HeaderActions from './header-actions';
import MobileMenu from './mobile-menu';
import SearchBox from '../../search/components/search-box';
import SettingsDialogProvider from '../../preferences/components/settings-dialog-provider';
import { media } from '../../../styles/util';

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
  background-color: ${COLORS.NEUTRAL.MYSTIC_400};
  box-shadow: 0px 1px 3px rgba(126, 142, 177, 0.2);
  color: ${COLORS.PRIMARY.SCAMPI_900};
  height: 70px;
  padding: 0 1.5rem;

  ${media.greaterThan('xl')`
    padding: 0 2rem;
  `}
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

const Header = () => {
  const location = useLocation();
  const breakpoint = useCurrentBreakpoint();
  const [mobileMenuState, updateMobileMenuState] = useState('closed');

  const closeMobileMenu = () => {
    updateMobileMenuState('closed');
  };

  const openMobileMenu = () => {
    updateMobileMenuState('open');
  };

  const isDesktop = breakpoint.greaterThan('md');

  return (
    <SettingsDialogProvider>
      {isDesktop || mobileMenuState === 'closed' ? null : (
        <MobileMenu onClose={closeMobileMenu} onNavigate={closeMobileMenu} />
      )}
      <StyledHeader>
        <div css="align-items: center; display: flex; justify-content: space-between; height: 100%;">
          {isDesktop ? (
            <>
              <div css="display: flex; width: 500px">
                <SearchBox autoFocus={false} onBlur={() => {}} />
              </div>
              <HeaderActions showSearch={location.pathname !== '/'} />
            </>
          ) : (
            <div css="display: flex; align-items: center;">
              <ActionButton onClick={() => {}} title="Search">
                <SearchIcon color="currentColor" height={22} width={22} />
              </ActionButton>
              <MenuButton onClick={openMobileMenu} title="Open menu">
                <MenuIcon height={20} />
              </MenuButton>
            </div>
          )}
        </div>
      </StyledHeader>
    </SettingsDialogProvider>
  );
};

export default Header;

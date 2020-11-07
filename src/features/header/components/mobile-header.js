import { useKey } from 'react-use';
import React, { useState } from 'react';
import styled from 'styled-components';

import { URL } from '../../../constants';
import { COLORS } from '../../../styles/constants';
import { CloseIcon, MenuIcon, SearchIcon } from '../../../components/icons';
import Link from '../../../components/link';
import logoImage from '../../../assets/images/logo-grayscale.svg';
import MobileMenu from './mobile-menu';
import MobileSearch from './mobile-search';
import SettingsDialogProvider from '../../preferences/components/settings-dialog-provider';
import { media } from '../../../styles/util';

const LogoImage = styled.img`
  height: 2.5rem;
`;

const StyledHeader = styled.header`
  align-items: center;
  background-color: ${COLORS.PRIMARY.SCAMPI_1000};
  color: ${COLORS.PRIMARY.SCAMPI_100};
  display: flex;
  height: 70px;
  justify-content: space-between;
  padding: 0.75rem 1rem;

  ${media.greaterThan('md')`
    padding: 0.75rem 1.5rem;
  `}
`;

const ActionButton = styled.button`
  align-items: center;
  background: none;
  border: none;
  color: inherit;
  cursor: pointer;
  display: flex;
  justify-content: center;
  margin: 0 24px 0 0;
  padding: 0;

  &:last-child {
    margin-right: 0;
  }
`;

const Actions = styled.div`
  align-items: center;
  display: flex;
`;

const MobileHeader = () => {
  const [searchVisible, setSearchVisible] = useState();
  const [menuVisible, setMenuVisible] = useState(false);

  useKey('/', (event) => {
    event.preventDefault();
    setSearchVisible(true);
  });

  const closeMenu = () => {
    setMenuVisible(false);
  };

  return (
    <SettingsDialogProvider>
      <StyledHeader>
        <Link href={URL.HOME}>
          <LogoImage alt="0x Tracker" src={logoImage} />
        </Link>
        <Actions>
          {!menuVisible && (
            <>
              <ActionButton
                onClick={() => {
                  setSearchVisible(true);
                }}
                title="Search"
              >
                <SearchIcon color="currentColor" height={20} width={20} />
              </ActionButton>
              <ActionButton
                onClick={() => {
                  setMenuVisible(true);
                }}
                title="Open menu"
              >
                <MenuIcon size={20} />
              </ActionButton>
            </>
          )}
          {menuVisible && (
            <ActionButton onClick={closeMenu} title="Close menu">
              <CloseIcon css="margin-right: -5px" size={30} />
            </ActionButton>
          )}
        </Actions>
      </StyledHeader>
      {searchVisible && (
        <MobileSearch
          onBlur={() => {
            setSearchVisible(false);
          }}
        />
      )}
      {menuVisible && <MobileMenu onNavigate={closeMenu} />}
    </SettingsDialogProvider>
  );
};

export default MobileHeader;

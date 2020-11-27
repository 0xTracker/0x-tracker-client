import React from 'react';
import styled from 'styled-components';

import { COLORS } from '../styles/constants';
import { URL } from '../constants';
import CompactNavigation from '../features/header/components/compact-navigation';
import Link from './link';
import logoImage from '../assets/images/icon-grayscale.svg';
import usePreferences from '../features/preferences/hooks/use-preferences';
import { SidebarExpandIcon } from './icons';

const LogoImage = styled.img`
  display: block;
  margin: 0 auto;
  width: 30px;
`;

const ExpandButton = styled.button`
  background: ${COLORS.PRIMARY.SCAMPI_900};
  border: none;
  display: flex;
  align-items: center;
  color: ${COLORS.PRIMARY.SCAMPI_100};
  border-radius: 0.25rem;
  padding: 0.75rem 0.75rem;
  justify-content: center;

  &:hover {
    background: ${COLORS.PRIMARY.SCAMPI_800};
  }
`;

const Footer = styled.div`
  justify-content: center;
  display: flex;
  padding: 0 1rem 1rem;
`;

const CompactSidebar = () => {
  const preferences = usePreferences();

  return (
    <div
      css={`
        background: ${COLORS.PRIMARY.SCAMPI_1000};
        display: flex;
        flex-direction: column;
        flex-shrink: 0;
        height: 100vh;
        position: relative;
        width: 72px;
      `}
    >
      <div
        css={`
          background-color: ${COLORS.PRIMARY.SCAMPI_900};
          display: flex;
          height: 80px;
          align-items: center;
          justify-content: center;
        `}
      >
        <Link css="display: block;" href={URL.HOME}>
          <LogoImage alt="0x Tracker" size="small" src={logoImage} />
        </Link>
      </div>
      <div css="height: 100%;">
        <CompactNavigation />
      </div>
      <Footer>
        <ExpandButton
          onClick={() => {
            preferences.set('sidebar', 'full');
          }}
          type="button"
        >
          <SidebarExpandIcon size={20} />
        </ExpandButton>
      </Footer>
    </div>
  );
};

export default CompactSidebar;

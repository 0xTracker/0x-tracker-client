import React from 'react';
import styled from 'styled-components';

import { COLORS } from '../styles/constants';
import { URL } from '../constants';
import Link from './link';
import logoImage from '../assets/images/logo-grayscale.svg';
import Navigation from '../features/header/components/navigation';
import MatchaSideBanner from '../features/advertising/components/matcha-side-banner';
import usePreferences from '../features/preferences/hooks/use-preferences';
import { SidebarContractIcon } from './icons';

const LogoImage = styled.img`
  display: block;
  height: 2.5rem;
`;

const ContractButton = styled.button`
  background: ${COLORS.PRIMARY.SCAMPI_800};
  border: none;
  display: flex;
  align-items: flex-end;
  color: ${COLORS.PRIMARY.SCAMPI_100};
  border-radius: 0.25rem;
  padding: 0.5rem;

  &:hover {
    background: ${COLORS.PRIMARY.SCAMPI_700};
  }
`;

const Footer = styled.div`
  justify-content: flex-end;
  background: ${COLORS.PRIMARY.SCAMPI_900};
  display: flex;
  padding: 0.5rem 1rem;
`;

const Sidebar = () => {
  const preferences = usePreferences();

  return (
    <div
      css={`
        width: 250px;
        background: ${COLORS.PRIMARY.SCAMPI_1000};
        height: 100vh;
        flex-shrink: 0;
        overflow-x: hidden;
        overflow-y: auto;
        display: flex;
        flex-direction: column;
      `}
    >
      <Link
        css={`
          align-items: center;
          background-color: ${COLORS.PRIMARY.SCAMPI_900};
          display: flex;
          padding-left: 1.5rem;
          height: 70px;
          flex-shrink: 0;
        `}
        href={URL.HOME}
      >
        <LogoImage alt="0x Tracker" size="small" src={logoImage} />
      </Link>
      <Navigation />
      <MatchaSideBanner />
      <Footer>
        <ContractButton
          onClick={() => {
            preferences.set('sidebar', 'compact');
          }}
          title="Contract menu"
          type="button"
        >
          <SidebarContractIcon size={20} />
        </ContractButton>
      </Footer>
    </div>
  );
};

export default Sidebar;

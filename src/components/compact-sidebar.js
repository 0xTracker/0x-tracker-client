import React from 'react';
import styled from 'styled-components';

import { COLORS } from '../styles/constants';
import { URL } from '../constants';
import CompactNavigation from '../features/header/components/compact-navigation';
import Link from './link';
import logoImage from '../assets/images/icon-grayscale.svg';

const LogoImage = styled.img`
  display: block;
  margin: 0 auto;
  width: 30px;
`;

const CompactSidebar = () => (
  <div
    css={`
      width: 72px;
      background: ${COLORS.PRIMARY.SCAMPI_1000};
      position: relative;
      height: 100vh;
      flex-shrink: 0;
    `}
  >
    <div
      css={`
        display: flex;
        height: 64px;
        align-items: center;
        justify-content: center;
      `}
    >
      <Link css="display: block;" href={URL.HOME}>
        <LogoImage alt="0x Tracker" size="small" src={logoImage} />
      </Link>
    </div>
    <CompactNavigation />
  </div>
);

export default CompactSidebar;

import React from 'react';
import styled from 'styled-components';

import { COLORS } from '../styles/constants';
import { URL } from '../constants';
import Link from './link';
import logoImage from '../assets/images/logo-grayscale.svg';
import Navigation from '../features/header/components/navigation';
import SideBanner from '../features/advertising/components/side-banner';

const LogoImage = styled.img`
  display: block;
  height: 2.5rem;
`;

const Sidebar = () => (
  <div
    css={`
      width: 250px;
      background: ${COLORS.PRIMARY.SCAMPI_1000};
      height: 100vh;
      flex-shrink: 0;
      overflow-y: scroll;
      display: flex;
      flex-direction: column;
    `}
  >
    <Link css="display: block; margin: 16px 0 0 16px;" href={URL.HOME}>
      <LogoImage alt="0x Tracker" size="small" src={logoImage} />
    </Link>
    <Navigation />
    <SideBanner />
  </div>
);

export default Sidebar;

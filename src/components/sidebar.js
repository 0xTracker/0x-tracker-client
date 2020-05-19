import React from 'react';
import styled from 'styled-components';

import { COLORS } from '../styles/constants';
import { URL } from '../constants';
import Link from './link';
import logoImage from '../assets/images/logo-grayscale.svg';
import SideBanner from '../features/advertising/components/side-banner';

const LogoImage = styled.img`
  display: block;
  height: 2.5rem;
  margin: 0 auto;
`;

const Sidebar = () => (
  <div
    css={`
      width: 250px;
      background: ${COLORS.PRIMARY.SCAMPI_1000};
      padding: 16px;
      position: relative;
      height: 100vh;
      flex-shrink: 0;
    `}
  >
    <Link css="display: block;" href={URL.HOME}>
      <LogoImage alt="0x Tracker" size="small" src={logoImage} />
    </Link>
    <SideBanner />
  </div>
);

export default Sidebar;

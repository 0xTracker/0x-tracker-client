import PropTypes from 'prop-types';
import React from 'react';
import styled from 'styled-components';

import { URL } from '../../../constants';
import MobileNavigationLink from './mobile-navigation-link';
import {
  AppsIcon,
  AssetBridgeIcon,
  FillsIcon,
  InsightsIcon,
  NewsIcon,
  TokensIcon,
  TradersIcon,
} from '../../../components/icons';

const StyledNav = styled.nav`
  display: flex;
  flex-direction: column;
  margin: 1rem 0 0;
`;

const MobileNavigationIcon = styled.span`
  color: white;
  margin-right: 0.75rem;
`;

const MobileNavigation = ({ onNavigate }) => (
  <StyledNav aria-label="Primary">
    <MobileNavigationLink href={URL.APPS} onClick={onNavigate}>
      <MobileNavigationIcon as={AppsIcon} />
      Apps
    </MobileNavigationLink>
    <MobileNavigationLink href={URL.ASSET_BRIDGES} onClick={onNavigate}>
      <MobileNavigationIcon as={AssetBridgeIcon} />
      Asset Bridges
    </MobileNavigationLink>
    <MobileNavigationLink href={URL.FILLS} onClick={onNavigate}>
      <MobileNavigationIcon as={FillsIcon} />
      Browse Trades
    </MobileNavigationLink>
    <MobileNavigationLink href={URL.NETWORK_INSIGHTS} onClick={onNavigate}>
      <MobileNavigationIcon as={InsightsIcon} />
      Network Insights
    </MobileNavigationLink>
    <MobileNavigationLink href={URL.NEWS} onClick={onNavigate}>
      <MobileNavigationIcon as={NewsIcon} />
      News & Updates
    </MobileNavigationLink>
    <MobileNavigationLink href={URL.TOKENS} onClick={onNavigate}>
      <MobileNavigationIcon as={TokensIcon} />
      Tokens
    </MobileNavigationLink>
    <MobileNavigationLink href={URL.TRADERS} onClick={onNavigate}>
      <MobileNavigationIcon as={TradersIcon} />
      Traders
    </MobileNavigationLink>
  </StyledNav>
);

MobileNavigation.propTypes = {
  onNavigate: PropTypes.func.isRequired,
};

export default MobileNavigation;

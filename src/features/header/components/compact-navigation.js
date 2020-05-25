import PropTypes from 'prop-types';
import React from 'react';
import styled from 'styled-components';

import { URL } from '../../../constants';
import {
  AssetBridgeIcon,
  FillsIcon,
  HomeIcon,
  InsightsIcon,
  NewsIcon,
  RelayersIcon,
  TokensIcon,
  TradersIcon,
} from '../../../components/icons';
import CompactNavigationLink from './compact-navigation-link';

const StyledNavigation = styled.nav`
  color: white;
  display: flex;
  flex-direction: column;
  margin: 16px 0 0;
`;

const CompactNavigation = ({ className }) => (
  <StyledNavigation aria-label="Primary" className={className}>
    <CompactNavigationLink href={URL.HOME}>
      <HomeIcon size={24} />
    </CompactNavigationLink>
    <CompactNavigationLink href={URL.ASSET_BRIDGES} title="Asset Bridges">
      <AssetBridgeIcon size={24} />
    </CompactNavigationLink>
    <CompactNavigationLink href={URL.FILLS} title="Browse Fills">
      <FillsIcon size={24} />
    </CompactNavigationLink>
    <CompactNavigationLink href={URL.NETWORK_INSIGHTS} title="Network Insights">
      <InsightsIcon size={24} />
    </CompactNavigationLink>
    <CompactNavigationLink href={URL.NEWS} title="News & Updates">
      <NewsIcon size={22} />
    </CompactNavigationLink>
    <CompactNavigationLink href={URL.RELAYERS} title="Relayers">
      <RelayersIcon size={20} />
    </CompactNavigationLink>
    <CompactNavigationLink href={URL.TOKENS} title="Tokens">
      <TokensIcon size={26} />
    </CompactNavigationLink>
    <CompactNavigationLink href={URL.TRADERS} title="Traders">
      <TradersIcon size={26} />
    </CompactNavigationLink>
  </StyledNavigation>
);

CompactNavigation.propTypes = {
  className: PropTypes.string,
};

CompactNavigation.defaultProps = {
  className: undefined,
};

export default CompactNavigation;

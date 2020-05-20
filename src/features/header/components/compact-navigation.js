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
  StakingIcon,
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
    <CompactNavigationLink href={URL.NETWORK_INSIGHTS}>
      <InsightsIcon size={24} />
    </CompactNavigationLink>
    <CompactNavigationLink href={URL.FILLS}>
      <FillsIcon size={24} />
    </CompactNavigationLink>
    <CompactNavigationLink href={URL.TOKENS}>
      <TokensIcon size={26} />
    </CompactNavigationLink>
    <CompactNavigationLink href={URL.RELAYERS}>
      <RelayersIcon size={20} />
    </CompactNavigationLink>
    <CompactNavigationLink href={URL.TRADERS}>
      <TradersIcon size={26} />
    </CompactNavigationLink>
    <CompactNavigationLink href={URL.ASSET_BRIDGES}>
      <AssetBridgeIcon size={24} />
    </CompactNavigationLink>
    <CompactNavigationLink href={URL.NEWS} title="News & Updates">
      <NewsIcon size={22} />
    </CompactNavigationLink>
    <CompactNavigationLink
      href="https://0x.org/zrx/staking"
      title="ZRX Staking"
    >
      <StakingIcon size={24} />
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

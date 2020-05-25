import PropTypes from 'prop-types';
import React from 'react';
import styled from 'styled-components';

import { URL } from '../../../constants';
import { COLORS } from '../../../styles/constants';
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
import NavigationLink from './navigation-link';

const StyledNavigation = styled.nav`
  color: ${COLORS.PRIMARY.SCAMPI_100};
  display: flex;
  flex-direction: column;
  margin: 24px 12px 0;
  flex-grow: 1;
`;

const NavigationIcon = styled.span`
  color: white;
  margin-right: 12px;
  width: 26px;
`;

const Navigation = ({ className }) => (
  <StyledNavigation aria-label="Primary" className={className}>
    <NavigationLink href={URL.HOME}>
      <NavigationIcon as={HomeIcon} size={24} /> Home
    </NavigationLink>
    <NavigationLink href={URL.ASSET_BRIDGES}>
      <NavigationIcon as={AssetBridgeIcon} size={24} /> Asset Bridges
    </NavigationLink>
    <NavigationLink href={URL.FILLS}>
      <NavigationIcon as={FillsIcon} size={24} /> Browse Fills
    </NavigationLink>
    <NavigationLink href={URL.NETWORK_INSIGHTS}>
      <NavigationIcon as={InsightsIcon} size={24} /> Network Insights
    </NavigationLink>
    <NavigationLink href={URL.NEWS} title="News & Updates">
      <NavigationIcon as={NewsIcon} size={22} /> News & Updates
    </NavigationLink>
    <NavigationLink href={URL.RELAYERS}>
      <NavigationIcon as={RelayersIcon} size={20} /> Relayers
    </NavigationLink>
    <NavigationLink href={URL.TOKENS}>
      <NavigationIcon as={TokensIcon} size={26} /> Tokens
    </NavigationLink>
    <NavigationLink href={URL.TRADERS}>
      <NavigationIcon as={TradersIcon} size={26} /> Traders
    </NavigationLink>
  </StyledNavigation>
);

Navigation.propTypes = {
  className: PropTypes.string,
};

Navigation.defaultProps = {
  className: undefined,
};

export default Navigation;

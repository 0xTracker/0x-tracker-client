import PropTypes from 'prop-types';
import React from 'react';
import styled from 'styled-components';

import { URL } from '../../../constants';
import { COLORS } from '../../../styles/constants';
import {
  AppsIcon,
  FillsIcon,
  InsightsIcon,
  NewsIcon,
  TokensIcon,
  TradersIcon,
} from '../../../components/icons';
import NavigationLink from './navigation-link';

const StyledNavigation = styled.nav`
  color: ${COLORS.PRIMARY.SCAMPI_100};
  display: flex;
  flex-direction: column;
  margin: 2rem 12px 0;
  flex-grow: 1;
`;

const NavigationIcon = styled.span`
  color: white;
  margin-right: 12px;
  width: 26px;
`;

const Navigation = ({ className }) => (
  <StyledNavigation aria-label="Primary" className={className}>
    <NavigationLink href={URL.APPS}>
      <NavigationIcon as={AppsIcon} size={24} /> Apps
    </NavigationLink>
    <NavigationLink href={URL.FILLS}>
      <NavigationIcon as={FillsIcon} size={24} /> Browse Trades
    </NavigationLink>
    <NavigationLink href={URL.NETWORK_INSIGHTS}>
      <NavigationIcon as={InsightsIcon} size={24} /> Network Insights
    </NavigationLink>
    <NavigationLink href={URL.NEWS} title="News & Updates">
      <NavigationIcon as={NewsIcon} size={22} /> News & Updates
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

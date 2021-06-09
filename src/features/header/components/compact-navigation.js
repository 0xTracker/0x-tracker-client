import PropTypes from 'prop-types';
import React from 'react';
import styled from 'styled-components';

import { URL } from '../../../constants';
import {
  AppsIcon,
  FillsIcon,
  InsightsIcon,
  NewsIcon,
  TokensIcon,
  TradersIcon,
} from '../../../components/icons';
import CompactNavigationLink from './compact-navigation-link';
import Tooltip from '../../../components/tooltip';

const StyledNavigation = styled.nav`
  color: white;
  display: flex;
  flex-direction: column;
  margin: 24px 0 0;
`;

const CompactNavigation = ({ className }) => (
  <StyledNavigation aria-label="Primary" className={className}>
    <Tooltip content="Apps">
      <CompactNavigationLink href={URL.APPS}>
        <AppsIcon size={24} />
      </CompactNavigationLink>
    </Tooltip>
    <Tooltip content="Browse Trades">
      <CompactNavigationLink href={URL.FILLS}>
        <FillsIcon size={24} />
      </CompactNavigationLink>
    </Tooltip>
    <Tooltip content="Network Insights">
      <CompactNavigationLink href={URL.NETWORK_INSIGHTS}>
        <InsightsIcon size={24} />
      </CompactNavigationLink>
    </Tooltip>
    <Tooltip content="News & Updates">
      <CompactNavigationLink href={URL.NEWS}>
        <NewsIcon size={22} />
      </CompactNavigationLink>
    </Tooltip>
    <Tooltip content="Tokens">
      <CompactNavigationLink href={URL.TOKENS}>
        <TokensIcon size={26} />
      </CompactNavigationLink>
    </Tooltip>
    <Tooltip content="Traders">
      <CompactNavigationLink href={URL.TRADERS}>
        <TradersIcon size={26} />
      </CompactNavigationLink>
    </Tooltip>
  </StyledNavigation>
);

CompactNavigation.propTypes = {
  className: PropTypes.string,
};

CompactNavigation.defaultProps = {
  className: undefined,
};

export default CompactNavigation;

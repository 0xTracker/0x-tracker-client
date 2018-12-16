import PropTypes from 'prop-types';
import React from 'react';
import styled from 'styled-components';

import { URL } from '../constants';
import NavigationItem from './navigation-item';

const StyledNavigation = styled.ul`
  list-style: none;
  margin: 0 0 0 30px;
  padding: 0;
`;

const Navigation = ({ className }) => (
  <StyledNavigation className={className}>
    <NavigationItem href={URL.FILLS} title="Fills" />
    <NavigationItem href={URL.TOKENS} title="Tokens" />
    <NavigationItem href={URL.RELAYERS} title="Relayers" />
    <NavigationItem href={URL.NEWS} title="News & Updates" />
    <NavigationItem
      href="https://0xproject.com/portal/account"
      title="My Wallet"
    />
  </StyledNavigation>
);

Navigation.propTypes = {
  className: PropTypes.string,
};

Navigation.defaultProps = {
  className: undefined,
};

export default Navigation;

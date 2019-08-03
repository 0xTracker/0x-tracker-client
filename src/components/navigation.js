import PropTypes from 'prop-types';
import React from 'react';
import styled from 'styled-components';

import { URL } from '../constants';
import NavigationItem from './navigation-item';

const StyledNavigation = styled.nav`
  margin: 0 0 0 2rem;
`;

const Navigation = ({ className }) => (
  <StyledNavigation aria-label="Primary" className={className}>
    <NavigationItem href={URL.FILLS} title="Fills" />
    <NavigationItem href={URL.TOKENS} title="Tokens" />
    <NavigationItem href={URL.RELAYERS} title="Relayers" />
    <NavigationItem href={URL.NEWS} title="News & Updates" />
  </StyledNavigation>
);

Navigation.propTypes = {
  className: PropTypes.string,
};

Navigation.defaultProps = {
  className: undefined,
};

export default Navigation;

import { withRouter } from 'react-router';
import PropTypes from 'prop-types';
import React from 'react';
import styled from 'styled-components';

import { colors } from '../styles/constants';
import Link from './link';

const NavigationLink = styled(Link)`
  color: ${props => (props.active ? 'currentColor' : colors.stormGray)};

  &:hover {
    color: currentColor;
    text-decoration: none;
  }
`;

const NavigationItem = ({ href, location, title }) => (
  <li css="display: inline-block; margin-right: 15px;">
    <NavigationLink
      active={location.pathname === href}
      href={href}
      title={title}
    >
      {title}
    </NavigationLink>
  </li>
);

NavigationItem.propTypes = {
  href: PropTypes.string.isRequired,
  location: PropTypes.shape({
    href: PropTypes.string.isRequired,
  }).isRequired,
  title: PropTypes.string.isRequired,
};

export default withRouter(NavigationItem);

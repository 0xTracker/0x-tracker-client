import { withRouter } from 'react-router';
import PropTypes from 'prop-types';
import React from 'react';
import styled from 'styled-components';

import Link from './link';

const NavigationLink = styled(Link)`
  color: ${props => (props.active ? 'white' : 'rgba(255, 255, 255, 0.7)')};

  &:hover {
    color: white;
    text-decoration: none;
  }
`;

const NavigationItem = ({ href, location, title }) => (
  <li css="display: inline-block; margin-right: 15px; font-size: 1.1em;">
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

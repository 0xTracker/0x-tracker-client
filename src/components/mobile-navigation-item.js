import PropTypes from 'prop-types';
import React from 'react';
import styled from 'styled-components';

import Link from './link';
import { colors } from '../styles/constants';

const NavigationLink = styled(Link)`
  border-bottom: 1px solid ${colors.martinique};
  color: currentColor;
  display: block;
  margin: 0 1rem;
  padding: 0.75rem 0.5rem;

  &:hover {
    background: ${colors.martinique};
    color: currentColor;
    text-decoration: none;
  }
`;

const MobileNavigationItem = ({ children, href, onClick }) => (
  <NavigationLink href={href} onClick={onClick}>
    {children}
  </NavigationLink>
);

MobileNavigationItem.propTypes = {
  children: PropTypes.node.isRequired,
  href: PropTypes.string.isRequired,
  location: PropTypes.shape({
    href: PropTypes.string.isRequired,
  }).isRequired,
  onClick: PropTypes.func.isRequired,
};

export default MobileNavigationItem;

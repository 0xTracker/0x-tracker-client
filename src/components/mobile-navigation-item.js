import PropTypes from 'prop-types';
import React from 'react';
import styled from 'styled-components';

import Link from './link';
import { colors } from '../styles/constants';

const NavigationLink = styled(Link)`
  background: none;
  border: none;
  border-bottom: 1px solid ${colors.martinique};
  color: currentColor;
  cursor: pointer;
  display: block;
  padding: 0.75rem 0.5rem;
  text-align: left;
  width: 100%;

  &:hover {
    background: ${colors.martinique};
    color: currentColor;
    text-decoration: none;
  }
`;

const MobileNavigationItem = ({ children, href, onClick }) => (
  <NavigationLink
    as={href ? undefined : 'button'}
    href={href}
    onClick={onClick}
  >
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

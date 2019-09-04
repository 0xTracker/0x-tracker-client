import PropTypes from 'prop-types';
import React from 'react';
import styled from 'styled-components';

import Link from './link';
import { colors } from '../styles/constants';

const StyledMobileNavigationLink = styled(Link)`
  background: none;
  border: none;
  border-bottom: 1px solid ${colors.martinique};
  color: currentColor;
  cursor: pointer;
  display: block;
  margin: 0 1rem;
  padding: 0.75rem 0.5rem;
  text-align: left;
  width: 100%;
`;

const MobileNavigationLink = ({ children, href, onClick }) => (
  <StyledMobileNavigationLink
    as={href ? undefined : 'button'}
    href={href}
    onClick={onClick}
  >
    {children}
  </StyledMobileNavigationLink>
);

MobileNavigationLink.propTypes = {
  children: PropTypes.node.isRequired,
  href: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
};

export default MobileNavigationLink;

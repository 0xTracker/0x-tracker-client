import PropTypes from 'prop-types';
import React from 'react';
import styled from 'styled-components';

import { colors } from '../styles/constants';
import Link from './link';

const StyledLink = styled(Link)`
  color: ${colors.lavenderGray};
  display: block;
  padding: 0.75rem 0 0.75rem 1rem;

  &:hover {
    color: ${colors.white};
    text-decoration: none;
  }
`;

const SubNavigationItem = ({ children, href }) => (
  <StyledLink href={href}>{children}</StyledLink>
);

SubNavigationItem.propTypes = {
  children: PropTypes.string.isRequired,
  href: PropTypes.string.isRequired,
};

export default SubNavigationItem;

import React from 'react';
import styled from 'styled-components';

import { colors } from '../styles/constants';

const StyledNavigation = styled.nav`
  background-color: ${colors.violet};
  padding: 1.5rem 0 1.5rem 1.5rem;
`;

const MobileSubNavigation = () => (
  <StyledNavigation>Menu items will go here</StyledNavigation>
);

export default MobileSubNavigation;

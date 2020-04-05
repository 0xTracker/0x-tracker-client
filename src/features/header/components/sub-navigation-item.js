import PropTypes from 'prop-types';
import React from 'react';
import styled from 'styled-components';
import { useLocation } from 'react-use';

import { colors } from '../../../styles/constants';
import Link from '../../../components/link';

const StyledLink = styled(Link)`
  color: ${(props) => (props.highlighted ? colors.white : colors.lavenderGray)};
  display: block;
  padding: 0.75rem 0 0.75rem 1rem;

  &:hover {
    color: ${colors.white};
    text-decoration: none;
  }
`;

const SubNavigationItem = ({ children, href }) => {
  const location = useLocation();
  const highlighted = location.pathname.startsWith(href);

  return (
    <StyledLink highlighted={highlighted} href={href}>
      {children}
    </StyledLink>
  );
};

SubNavigationItem.propTypes = {
  children: PropTypes.string.isRequired,
  href: PropTypes.string.isRequired,
};

export default SubNavigationItem;

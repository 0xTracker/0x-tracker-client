import { useLocation } from 'react-use';
import PropTypes from 'prop-types';
import React from 'react';
import styled from 'styled-components';

import { colors } from '../../../styles/constants';
import Link from '../../../components/link';

const StyledMobileNavigationLink = styled(Link)`
  background: none;
  border: none;
  border-bottom: 1px solid ${colors.martinique};
  color: ${(props) => (props.highlighted ? colors.white : colors.lavenderGray)};
  cursor: pointer;
  display: block;
  flex-grow: 1;
  margin: 0 1rem;
  padding: 0.75rem 0.5rem;
  text-align: left;

  &:hover {
    color: ${colors.white};
  }
`;

const MobileNavigationLink = ({ children, href, onClick }) => {
  const location = useLocation();
  const highlighted = location.pathname.startsWith(href);

  return (
    <StyledMobileNavigationLink
      as={href ? undefined : 'button'}
      highlighted={highlighted}
      href={href}
      onClick={onClick}
    >
      {children}
    </StyledMobileNavigationLink>
  );
};

MobileNavigationLink.propTypes = {
  children: PropTypes.node.isRequired,
  href: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
};

export default MobileNavigationLink;

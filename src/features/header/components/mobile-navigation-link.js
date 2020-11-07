import { useLocation } from 'react-use';
import PropTypes from 'prop-types';
import React from 'react';
import styled from 'styled-components';

import { COLORS } from '../../../styles/constants';
import Link from '../../../components/link';
import { media } from '../../../styles/util';

const StyledMobileNavigationLink = styled(Link)`
  align-items: center;
  border: none;
  border-bottom: 1px solid ${COLORS.PRIMARY.SCAMPI_800};
  color: ${(props) => (props.highlighted ? 'white' : 'inherit')};
  cursor: pointer;
  display: flex;
  flex-grow: 1;
  margin: 0 1rem;
  padding: 0.75rem 0;
  text-align: left;

  ${media.greaterThan('md')`
    margin: 0 1.5rem;
  `}

  &:hover {
    color: white;
  }
`;

const MobileNavigationLink = ({ children, href, onClick }) => {
  const location = useLocation();
  const highlighted = location.pathname.startsWith(href);

  return (
    <StyledMobileNavigationLink
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

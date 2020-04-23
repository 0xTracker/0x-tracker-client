import { useLocation } from 'react-use';
import PropTypes from 'prop-types';
import React from 'react';
import styled from 'styled-components';

import { COLORS } from '../../../styles/constants';
import Link from '../../../components/link';

const StyledNavigation = styled.nav`
  background-color: ${COLORS.PRIMARY.SCAMPI_900};
  padding: 1rem 0 1rem 1.5rem;
`;

const MobileSubNavigationLink = styled(Link)`
  color: ${(props) =>
    props.highlighted ? 'white' : COLORS.PRIMARY.SCAMPI_200};
  display: block;
  margin: 1.25rem 0 0;

  &:first-child {
    margin: 0;
  }
`;

const MobileSubNavigation = ({ items, onNavigate }) => {
  const location = useLocation();

  return (
    <StyledNavigation>
      {items.map((item) => (
        <MobileSubNavigationLink
          highlighted={location.pathname.startsWith(item.href)}
          href={item.href}
          key={item.href}
          onClick={onNavigate}
        >
          {item.title}
        </MobileSubNavigationLink>
      ))}
    </StyledNavigation>
  );
};

MobileSubNavigation.propTypes = {
  items: PropTypes.arrayOf(
    PropTypes.shape({
      href: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
    }),
  ).isRequired,
  onNavigate: PropTypes.func.isRequired,
};

export default MobileSubNavigation;

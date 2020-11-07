import { useLocation } from 'react-use';
import PropTypes from 'prop-types';
import React from 'react';
import styled from 'styled-components';

import { COLORS } from '../../../styles/constants';
import Link from '../../../components/link';

const StyledNavigationLink = styled(Link)`
  background-color: ${(props) =>
    props.active ? COLORS.PRIMARY.SCAMPI_800 : 'inherit'};
  color: ${(props) => (props.active ? COLORS.ACCENT.ANZAC_600 : 'inherit')};
  display: flex;
  align-items: center;
  height: 50px;
  justify-content: center;
  width: 100%;

  &:hover {
    background-color: ${(props) =>
      props.active ? COLORS.PRIMARY.SCAMPI_800 : COLORS.PRIMARY.SCAMPI_900};
    color: ${(props) => (props.active ? COLORS.ACCENT.ANZAC_600 : 'inherit')};
  }
`;

const CompactNavigationLink = ({ href, children, ...otherProps }) => {
  const location = useLocation();

  const active =
    (location.pathname === '/' && href === '/') ||
    (href !== '/' && location.pathname.startsWith(href));

  return (
    <StyledNavigationLink
      active={active}
      aria-current={active}
      href={href}
      {...otherProps}
    >
      {children}
    </StyledNavigationLink>
  );
};

CompactNavigationLink.propTypes = {
  children: PropTypes.string.isRequired,
  href: PropTypes.string.isRequired,
};

export default CompactNavigationLink;

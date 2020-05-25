import { useLocation } from 'react-use';
import PropTypes from 'prop-types';
import React from 'react';
import styled from 'styled-components';

import { COLORS } from '../../../styles/constants';
import Link from '../../../components/link';

const StyledNavigationLink = styled(Link)`
  background-color: ${(props) =>
    props.active ? COLORS.PRIMARY.SCAMPI_800 : 'inherit'};
  color: ${(props) => (props.active ? 'white' : 'inherit')};
  border-radius: 4px;
  display: flex;
  align-items: center;
  height: 41px;
  padding: 0 12px;
  width: 100%;
  line-height: 1;
  margin: 2px 0;

  &:hover {
    background-color: ${(props) =>
      props.active ? COLORS.PRIMARY.SCAMPI_800 : COLORS.PRIMARY.SCAMPI_900};
  }
`;

const NavigationLink = ({ href, children, ...otherProps }) => {
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

NavigationLink.propTypes = {
  children: PropTypes.node.isRequired,
  href: PropTypes.string.isRequired,
};

export default NavigationLink;

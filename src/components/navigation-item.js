import PropTypes from 'prop-types';
import React from 'react';
import styled from 'styled-components';
import useLocation from 'react-use/lib/useLocation';

import { colors } from '../styles/constants';
import Link from './link';

const NavigationLink = styled(Link)`
  color: ${props => (props.active ? 'currentColor' : colors.stormGray)};
  display: inline-block;
  margin-right: 15px;

  &:hover {
    color: currentColor;
    text-decoration: none;
  }
`;

const NavigationItem = ({ href, title }) => {
  const location = useLocation();
  const active = location.pathname === href;

  return (
    <NavigationLink
      active={active}
      aria-current={active}
      href={href}
      title={title}
    >
      {title}
    </NavigationLink>
  );
};

NavigationItem.propTypes = {
  href: PropTypes.string.isRequired,
  location: PropTypes.shape({
    href: PropTypes.string.isRequired,
  }).isRequired,
  title: PropTypes.string.isRequired,
};

export default NavigationItem;

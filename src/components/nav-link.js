import _ from 'lodash';
import { NavItem, NavLink as BootstrapNavLink } from 'reactstrap';
import PropTypes from 'prop-types';
import React from 'react';

import Link from './link';

const NavLink = ({ children, currentUrl, onClick, url }) => (
  <NavItem active={_.isString(url) && currentUrl.startsWith(url)}>
    <BootstrapNavLink href={url} onClick={onClick} tag={Link}>
      {children}
    </BootstrapNavLink>
  </NavItem>
);

NavLink.propTypes = {
  children: PropTypes.node.isRequired,
  currentUrl: PropTypes.string.isRequired,
  onClick: PropTypes.func,
  url: PropTypes.string,
};

NavLink.defaultProps = {
  onClick: undefined,
  url: undefined,
};

export default NavLink;

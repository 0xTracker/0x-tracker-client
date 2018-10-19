import _ from 'lodash';
import { withRouter } from 'react-router';
import { NavItem, NavLink as BootstrapNavLink } from 'reactstrap';
import PropTypes from 'prop-types';
import React from 'react';

import Link from './link';

const NavLink = ({ children, onClick, href, location: { pathname } }) => (
  <NavItem active={_.isString(href) && pathname.startsWith(href)}>
    <BootstrapNavLink href={href} onClick={onClick} tag={Link}>
      {children}
    </BootstrapNavLink>
  </NavItem>
);

NavLink.propTypes = {
  children: PropTypes.node.isRequired,
  href: PropTypes.string,
  location: PropTypes.shape({ pathname: PropTypes.string.isRequired })
    .isRequired,
  onClick: PropTypes.func,
};

NavLink.defaultProps = {
  href: undefined,
  onClick: undefined,
};

export default withRouter(NavLink);

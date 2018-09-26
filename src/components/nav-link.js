import classNames from 'classnames';
import PropTypes from 'prop-types';
import React from 'react';

import Link from './link';

const NavLink = ({ children, currentUrl, onClick, url }) => (
  <li
    className={classNames({
      'nav-item': true,
      active: currentUrl.startsWith(url),
    })}
  >
    <Link className="nav-link" href={url} onClick={onClick}>
      {children}
    </Link>
  </li>
);

NavLink.propTypes = {
  children: PropTypes.node.isRequired,
  currentUrl: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
  url: PropTypes.string.isRequired,
};

export default NavLink;

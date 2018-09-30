import _ from 'lodash';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import React from 'react';

import Link from './link';

const NavLink = ({ children, currentUrl, onClick, url }) => (
  <li
    className={classNames({
      'nav-item': true,
      active: _.isString(url) && currentUrl.startsWith(url),
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
  onClick: PropTypes.func,
  url: PropTypes.string,
};

NavLink.defaultProps = {
  onClick: undefined,
  url: undefined,
};

export default NavLink;

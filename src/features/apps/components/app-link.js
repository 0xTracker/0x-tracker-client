import PropTypes from 'prop-types';
import React from 'react';

import buildAppUrl from '../util/build-app-url';
import Link from '../../../components/link';

const AppLink = ({ children, className, urlSlug }) => (
  <Link className={className} href={buildAppUrl(urlSlug)}>
    {children}
  </Link>
);

AppLink.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  urlSlug: PropTypes.string.isRequired,
};

AppLink.defaultProps = {
  children: undefined,
  className: undefined,
};

export default AppLink;

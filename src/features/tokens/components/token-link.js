import PropTypes from 'prop-types';
import React from 'react';

import buildTokenUrl from '../util/build-token-url';
import Link from '../../../components/link';

const TokenLink = ({ address, children, className }) => (
  <Link className={className} href={buildTokenUrl(address)}>
    {children}
  </Link>
);

TokenLink.propTypes = {
  address: PropTypes.string,
  children: PropTypes.node,
  className: PropTypes.string,
};

TokenLink.defaultProps = {
  address: undefined,
  children: undefined,
  className: undefined,
};

export default TokenLink;

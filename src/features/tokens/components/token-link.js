import PropTypes from 'prop-types';
import React from 'react';

import buildTokenUrl from '../util/build-token-url';
import Link from '../../../components/link';

const TokenLink = ({ address, children }) => (
  <Link href={buildTokenUrl(address)}>{children}</Link>
);

TokenLink.propTypes = {
  address: PropTypes.string,
  children: PropTypes.node,
};

TokenLink.defaultProps = {
  address: undefined,
  children: undefined,
};

export default TokenLink;

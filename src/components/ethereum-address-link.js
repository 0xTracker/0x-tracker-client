import PropTypes from 'prop-types';
import React from 'react';

import buildSearchUrl from '../features/search/util/build-search-url';
import Link from './link';

const EthereumAddressLink = ({ address, children }) => (
  <Link href={buildSearchUrl(address)}>{children}</Link>
);

EthereumAddressLink.propTypes = {
  address: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
};

export default EthereumAddressLink;

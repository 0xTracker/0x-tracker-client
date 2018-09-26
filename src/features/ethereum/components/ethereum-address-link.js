import PropTypes from 'prop-types';
import React from 'react';

import buildSearchUrl from '../../search/util/build-search-url';
import Link from '../../../components/link';

const EthereumAddressLink = ({ address }) => (
  <Link href={buildSearchUrl(address)}>{address}</Link>
);

EthereumAddressLink.propTypes = {
  address: PropTypes.string.isRequired,
};

export default EthereumAddressLink;

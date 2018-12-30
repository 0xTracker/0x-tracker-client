import PropTypes from 'prop-types';
import React from 'react';

import buildRelayerUrl from '../util/build-relayer-url';
import Link from '../../../components/link';

const RelayerLink = ({ children, relayer }) => (
  <Link href={buildRelayerUrl(relayer)}>{children || relayer.name}</Link>
);

RelayerLink.propTypes = {
  children: PropTypes.node,
  relayer: PropTypes.shape({
    name: PropTypes.string.isRequired,
    slug: PropTypes.string.isRequired,
  }).isRequired,
};

RelayerLink.defaultProps = {
  children: undefined,
};

export default RelayerLink;

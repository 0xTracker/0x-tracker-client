import PropTypes from 'prop-types';
import React from 'react';

import buildRelayerUrl from '../util/build-relayer-url';
import Link from '../../../components/link';

const RelayerLink = ({ relayer }) => (
  <Link href={buildRelayerUrl(relayer)}>{relayer.name}</Link>
);

RelayerLink.propTypes = {
  relayer: PropTypes.shape({
    name: PropTypes.string.isRequired,
    slug: PropTypes.string.isRequired,
  }).isRequired,
};

export default RelayerLink;

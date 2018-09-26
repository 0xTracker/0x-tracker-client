import _ from 'lodash';
import PropTypes from 'prop-types';
import React from 'react';

import buildSearchUrl from '../../search/util/build-search-url';
import Link from '../../../components/link';
import RelayerLink from '../../relayers/components/relayer-link';

const FillRelayerLink = ({ fill }) => {
  const { feeRecipient, relayer } = fill;

  if (_.isNil(relayer)) {
    if (feeRecipient === '0x0000000000000000000000000000000000000000') {
      return 'None';
    }

    return <Link href={buildSearchUrl(feeRecipient)}>Unknown</Link>;
  }

  return <RelayerLink relayer={relayer} />;
};

FillRelayerLink.propTypes = {
  fill: PropTypes.shape({
    feeRecipient: PropTypes.string.isRequired,
    relayer: PropTypes.shape({
      name: PropTypes.string.isRequired,
      url: PropTypes.string.isRequired,
    }),
  }).isRequired,
};

export default FillRelayerLink;

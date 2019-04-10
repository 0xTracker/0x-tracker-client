import _ from 'lodash';
import PropTypes from 'prop-types';
import React from 'react';

import buildSearchUrl from '../../search/util/build-search-url';
import Link from '../../../components/link';
import RelayerImage from '../../relayers/components/relayer-image';
import RelayerLink from '../../relayers/components/relayer-link';

const FillRelayerLink = ({ fill, showImage }) => {
  const { feeRecipient, relayer } = fill;

  if (_.isNil(relayer)) {
    if (feeRecipient === '0x0000000000000000000000000000000000000000') {
      return 'None';
    }

    return <Link href={buildSearchUrl(feeRecipient)}>Unknown</Link>;
  }

  return (
    <RelayerLink css="display: flex; align-items: center;" relayer={relayer}>
      {showImage && relayer.imageUrl && (
        <RelayerImage
          css="margin-right: 0.5rem;"
          height={20}
          imageUrl={relayer.imageUrl}
          width={20}
        />
      )}
      {relayer.name}
    </RelayerLink>
  );
};

FillRelayerLink.propTypes = {
  fill: PropTypes.shape({
    feeRecipient: PropTypes.string.isRequired,
    relayer: PropTypes.shape({
      name: PropTypes.string.isRequired,
      slug: PropTypes.string.isRequired,
    }),
  }).isRequired,
  showImage: PropTypes.bool,
};

FillRelayerLink.defaultProps = {
  showImage: false,
};

export default FillRelayerLink;

import _ from 'lodash';
import PropTypes from 'prop-types';
import React from 'react';

import Link from '../../../components/link';
import RelayerImage from '../../relayers/components/relayer-image';
import RelayerLink from '../../relayers/components/relayer-link';

const FillRelayerLink = ({ fill, showImage }) => {
  const { relayer } = fill;

  if (_.isNil(relayer)) {
    return <Link href="/relayers/unknown">Unknown</Link>;
  }

  return (
    <RelayerLink
      css="display: flex; align-items: center;"
      relayer={relayer.slug}
    >
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
    relayer: PropTypes.shape({
      imageUrl: PropTypes.string.isRequired,
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

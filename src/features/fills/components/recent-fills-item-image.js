import PropTypes from 'prop-types';
import React from 'react';

import RelayerLink from '../../relayers/components/relayer-link';
import UnknownRelayerImage from '../../relayers/components/unknown-relayer-image';

const RecentFillsItemImage = ({ fill }) => {
  if (fill.relayer) {
    return (
      <RelayerLink css="color: currentColor;" relayer={fill.relayer.slug}>
        <img
          alt=""
          css="width: 50px; height: 50px; margin-right: 1rem; border-radius: 0.25rem;"
          src={fill.relayer.imageUrl}
        />
      </RelayerLink>
    );
  }

  return (
    <RelayerLink relayer="unknown">
      <UnknownRelayerImage css="margin-right: 1rem;" size={50} />
    </RelayerLink>
  );
};

RecentFillsItemImage.propTypes = {
  fill: PropTypes.object.isRequired,
};

export default RecentFillsItemImage;

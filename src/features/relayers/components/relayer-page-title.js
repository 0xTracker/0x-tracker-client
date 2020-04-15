import _ from 'lodash';
import PropTypes from 'prop-types';
import React from 'react';

import RelayerImage from './relayer-image';

const RelayerPageTitle = ({ relayer }) => (
  <div css="align-items: center; display: flex;">
    {_.has(relayer, 'imageUrl') ? (
      <RelayerImage
        css="margin-right: 0.75rem;"
        height={30}
        imageUrl={relayer.imageUrl}
        width={30}
      />
    ) : null}
    {relayer.name}
  </div>
);

RelayerPageTitle.propTypes = {
  relayer: PropTypes.shape({
    imageUrl: PropTypes.string,
    name: PropTypes.string,
  }).isRequired,
};

export default RelayerPageTitle;

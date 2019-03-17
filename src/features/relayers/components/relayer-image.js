import _ from 'lodash';
import { Square as SquareIcon } from 'styled-icons/fa-solid/Square';
import PropTypes from 'prop-types';
import React from 'react';

import { colors } from '../../../styles/constants';

const RelayerImage = ({ imageUrl }) =>
  _.isString(imageUrl) ? (
    <img
      css="border-radius: 0.25rem; height: 2.75rem; width: 2.75rem;"
      src={imageUrl}
    />
  ) : (
    <SquareIcon color={colors.mischka} height={40} width={40} />
  );

RelayerImage.propTypes = {
  imageUrl: PropTypes.string,
};

RelayerImage.defaultProps = {
  imageUrl: undefined,
};

export default RelayerImage;

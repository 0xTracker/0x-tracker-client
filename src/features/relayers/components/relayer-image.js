import _ from 'lodash';
import { Square as SquareIcon } from 'styled-icons/fa-solid/Square.cjs';
import PropTypes from 'prop-types';
import React from 'react';

import { colors } from '../../../styles/constants';

const RelayerImage = ({ imageUrl }) =>
  _.isString(imageUrl) ? (
    <img css="border-radius: 3px; height: 40px; width: 40px;" src={imageUrl} />
  ) : (
    <SquareIcon color={colors.mischka} height={40} width={40} />
  );

RelayerImage.propTypes = {
  imageUrl: PropTypes.string.isRequired,
};

export default RelayerImage;

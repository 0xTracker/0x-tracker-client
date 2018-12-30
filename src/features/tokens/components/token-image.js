import _ from 'lodash';
import { Circle as CircleIcon } from 'styled-icons/fa-solid/Circle.cjs';
import PropTypes from 'prop-types';
import React from 'react';

import { colors } from '../../../styles/constants';

const TokenImage = ({ imageUrl }) =>
  _.isString(imageUrl) ? (
    <img css="border-radius: 3px; height: 40px; width: 40px;" src={imageUrl} />
  ) : (
    <CircleIcon color={colors.mischka} height={40} width={40} />
  );

TokenImage.propTypes = {
  imageUrl: PropTypes.string.isRequired,
};

export default TokenImage;

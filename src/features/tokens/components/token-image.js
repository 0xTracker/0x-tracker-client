import _ from 'lodash';
import { Circle as CircleIcon } from 'styled-icons/fa-solid/Circle';
import PropTypes from 'prop-types';
import React from 'react';

import { colors } from '../../../styles/constants';

const TokenImage = ({ imageUrl }) =>
  _.isString(imageUrl) ? (
    <img
      css="border-radius: 0.25rem; height: 2.75rem; width: 2.75rem;"
      src={imageUrl}
    />
  ) : (
    <CircleIcon color={colors.mischka} height={40} width={40} />
  );

TokenImage.propTypes = {
  imageUrl: PropTypes.string,
};

TokenImage.defaultProps = {
  imageUrl: undefined,
};

export default TokenImage;

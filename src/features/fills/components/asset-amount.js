import _ from 'lodash';
import PropTypes from 'prop-types';
import React from 'react';

import formatTokenAmount from '../../../util/format-token-amount';

const AssetAmount = ({ asset }) =>
  _.isString(asset.amount) &&
  asset.type !== 'erc-721' && <>{formatTokenAmount(asset.amount)} </>;

AssetAmount.propTypes = {
  asset: PropTypes.shape({
    amount: PropTypes.string,
    type: PropTypes.string.isRequired,
  }).isRequired,
};

export default AssetAmount;

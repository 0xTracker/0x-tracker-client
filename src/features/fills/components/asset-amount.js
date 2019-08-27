import _ from 'lodash';
import React from 'react';

import formatTokenAmount from '../../../util/format-token-amount';

const AssetAmount = ({ asset }) =>
  _.isString(asset.amount) &&
  asset.type !== 'erc-721' && <>{formatTokenAmount(asset.amount)} </>;

export default AssetAmount;

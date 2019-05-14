import _ from 'lodash';
import React from 'react';

import formatToken from '../../../util/format-token';

const AssetAmount = ({ asset }) =>
  _.isString(asset.amount) &&
  asset.type !== 'erc-721' && <>{formatToken(asset.amount)} </>;

export default AssetAmount;

import React from 'react';

import formatToken from '../../../util/format-token';

const AssetAmount = ({ asset }) =>
  asset.amount !== undefined &&
  asset.type !== 'erc-721' && <>{formatToken(asset.amount)} </>;

export default AssetAmount;

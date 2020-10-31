import _ from 'lodash';
import PropTypes from 'prop-types';
import React from 'react';

import AssetAmount from './asset-amount';

const RecentFillsItemAssets = ({ assets }) => {
  if (assets.length === 0) {
    return 'None';
  }

  if (assets.length > 1) {
    return 'Multiple Assets';
  }

  const asset = assets[0];
  const symbol = _.isString(asset.tokenSymbol) ? asset.tokenSymbol : 'Unknown';

  return (
    <>
      <AssetAmount asset={asset} /> {symbol}
    </>
  );
};

RecentFillsItemAssets.propTypes = {
  assets: PropTypes.arrayOf(
    PropTypes.shape({
      amount: PropTypes.string,
      tokenAddress: PropTypes.string.isRequired,
      tokenId: PropTypes.number,
      tokenSymbol: PropTypes.string,
      type: PropTypes.string.isRequired,
    }),
  ).isRequired,
};

export default RecentFillsItemAssets;

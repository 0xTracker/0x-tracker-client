import PropTypes from 'prop-types';
import React from 'react';

import AssetLabel from './asset-label';
import AssetAmount from './asset-amount';

const FillListAssets = ({ assets }) => {
  if (assets.length > 1) {
    return 'Multiple Assets';
  }

  const asset = assets[0];

  return (
    <>
      <AssetAmount asset={asset} />
      <AssetLabel asset={asset} condensed linked={false} />
    </>
  );
};

FillListAssets.propTypes = {
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

export default FillListAssets;

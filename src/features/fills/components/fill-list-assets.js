import PropTypes from 'prop-types';
import React from 'react';

import AssetLabel from './asset-label';
import AssetAmount from './asset-amount';

const FillListAssets = ({ assets, linked }) => {
  if (assets.length > 1) {
    return 'Multiple Assets';
  }

  const asset = assets[0];

  return (
    <>
      <AssetAmount asset={asset} />
      <AssetLabel asset={asset} condensed linked={linked} />
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
  linked: PropTypes.bool,
};

FillListAssets.defaultProps = {
  linked: false,
};

export default FillListAssets;

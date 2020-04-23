import _ from 'lodash';
import PropTypes from 'prop-types';
import React from 'react';

import { COLORS } from '../../../styles/constants';
import AssetAmount from './asset-amount';
import TokenLink from '../../tokens/components/token-link';

const FillListAssets = ({ assets, linked }) => {
  if (assets.length > 1) {
    return 'Multiple Assets';
  }

  const asset = assets[0];
  const symbol = _.isString(asset.tokenSymbol) ? asset.tokenSymbol : 'Unknown';

  if (linked === false) {
    return (
      <>
        <AssetAmount asset={asset} /> {symbol}
      </>
    );
  }

  return (
    <>
      <AssetAmount asset={asset} />{' '}
      <TokenLink
        address={asset.tokenAddress}
        css={`
          color: ${COLORS.NEUTRAL.MYSTIC_600};
          font-weight: 500;
          letter-spacing: 0.05em;
        `}
      >
        {symbol}
      </TokenLink>
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

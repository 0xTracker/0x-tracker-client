import _ from 'lodash';
import PropTypes from 'prop-types';
import React from 'react';

import { COLORS } from '../../../styles/constants';
import AssetAmount from './asset-amount';
import TokenLink from '../../tokens/components/token-link';
import FillAssetsImage from './fill-assets-image';

const FillListAssets = ({ assets }) => {
  const asset = assets[0];
  const symbol = _.isString(asset.tokenSymbol) ? asset.tokenSymbol : 'Unknown';

  return (
    <div css="display: flex; align-items: center;">
      <div
        css={`
          display: flex;
          align-items: center;
          width: 25px;
          height: 25px;
          margin-right: 0.5rem;
          border: 1px solid ${COLORS.NEUTRAL.MYSTIC_300};
          border-radius: 4px;
          padding: 4px;
        `}
      >
        <FillAssetsImage assets={assets} />
      </div>
      <span>
        {assets.length > 1 ? (
          'Multiple Assets'
        ) : (
          <>
            <AssetAmount asset={asset} />{' '}
            <TokenLink
              address={asset.tokenAddress}
              css={`
                color: ${COLORS.NEUTRAL.MYSTIC_600};
                letter-spacing: 0.05em;
              `}
            >
              {symbol}
            </TokenLink>
          </>
        )}
      </span>
    </div>
  );
};

FillListAssets.propTypes = {
  assets: PropTypes.arrayOf(
    PropTypes.shape({
      amount: PropTypes.string,
      tokenAddress: PropTypes.string.isRequired,
      tokenId: PropTypes.number,
      tokenImageUrl: PropTypes.string,
      tokenSymbol: PropTypes.string,
      type: PropTypes.string.isRequired,
    }),
  ).isRequired,
};

export default FillListAssets;

/* eslint-disable no-nested-ternary */
import _ from 'lodash';
import PropTypes from 'prop-types';
import React from 'react';

import { COLORS } from '../../../styles/constants';
import AssetAmount from './asset-amount';
import TokenLink from '../../tokens/components/token-link';
import FillAssetsImage from './fill-assets-image';

const FillListAssets = ({ assets }) => (
  <div css="display: flex; align-items: center;">
    <div
      css={`
        display: flex;
        align-items: center;
        width: 25px;
        height: 25px;
        margin-right: 0.5rem;
        border: 1px solid ${COLORS.NEUTRAL.MYSTIC_400};
        border-radius: 4px;
        padding: 4px;
      `}
    >
      <FillAssetsImage assets={assets} />
    </div>
    <span>
      {assets.length === 0 ? (
        'None'
      ) : assets.length > 1 ? (
        'Multiple Assets'
      ) : (
        <>
          <AssetAmount asset={assets[0]} />{' '}
          <TokenLink
            address={assets[0].tokenAddress}
            css={`
              color: ${COLORS.NEUTRAL.MYSTIC_700};
              letter-spacing: 0.05em;
            `}
          >
            {_.isString(assets[0].tokenSymbol)
              ? assets[0].tokenSymbol
              : 'Unknown'}
          </TokenLink>
        </>
      )}
    </span>
  </div>
);

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
/* eslint-enable no-nested-ternary */

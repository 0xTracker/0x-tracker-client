import PropTypes from 'prop-types';
import React from 'react';
import styled from 'styled-components';

import AssetLabel from './asset-label';
import formatToken from '../../../util/format-token';

const AssetTypeBadge = styled.span.attrs({ className: 'badge badge-dark' })`
  color: white;
  margin-left: 0.5rem;
`;

const FillAsset = ({ asset, condensed }) => {
  return (
    <>
      {asset.amount !== undefined && asset.type !== 'erc-721' && (
        <>{formatToken(asset.amount)} </>
      )}
      <AssetLabel asset={asset} condensed={condensed} />{' '}
      {asset.type === 'erc-721' && <AssetTypeBadge>ERC-721</AssetTypeBadge>}
      {asset.type === 'erc-20' && <AssetTypeBadge>ERC-20</AssetTypeBadge>}
    </>
  );
};

FillAsset.propTypes = {
  asset: PropTypes.shape({
    amount: PropTypes.string,
    tokenAddress: PropTypes.string.isRequired,
    tokenId: PropTypes.string,
    tokenSymbol: PropTypes.string,
    type: PropTypes.string.isRequired,
  }).isRequired,
  condensed: PropTypes.bool,
};

FillAsset.defaultProps = {
  condensed: false,
};

export default FillAsset;

import PropTypes from 'prop-types';
import React from 'react';

import buildTokenUrl from '../../tokens/util/build-token-url';
import Link from '../../../components/link';

const AssetLabel = ({ asset }) => {
  const assetLink =
    asset.type === 'erc-721'
      ? `https://opensea.io/assets/${asset.tokenAddress}/${asset.tokenId}`
      : buildTokenUrl(asset.tokenAddress);

  return (
    <Link href={assetLink}>
      {asset.tokenType || 'Unknown Token'}{' '}
      {asset.tokenId && <>#{asset.tokenId}</>}{' '}
      {asset.tokenSymbol && <>({asset.tokenSymbol})</>}
    </Link>
  );
};

AssetLabel.propTypes = {
  asset: PropTypes.shape({
    tokenAddress: PropTypes.string.isRequired,
    tokenId: PropTypes.number,
    tokenSymbol: PropTypes.string,
    tokenType: PropTypes.string,
  }).isRequired,
};

export default AssetLabel;

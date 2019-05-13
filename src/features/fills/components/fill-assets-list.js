import PropTypes from 'prop-types';
import React from 'react';
import styled from 'styled-components';

import AssetAmount from './asset-amount';
import AssetLabel from './asset-label';
import List from '../../../components/list';
import ListItem from '../../../components/list-item';

const AssetTypeBadge = styled.span.attrs({ className: 'badge badge-dark' })`
  color: white;
  margin-left: 0.5rem;
`;

const FillAssetsList = ({ assets, condensed }) => {
  if (assets.length === 0) {
    return null;
  }

  return (
    <List>
      {assets.map((asset, index) => (
        // eslint-disable-next-line react/no-array-index-key
        <ListItem key={index}>
          <AssetAmount asset={asset} />
          <AssetLabel asset={asset} condensed={condensed} />{' '}
          {asset.type === 'erc-721' && <AssetTypeBadge>ERC-721</AssetTypeBadge>}
          {asset.type === 'erc-20' && <AssetTypeBadge>ERC-20</AssetTypeBadge>}
        </ListItem>
      ))}
    </List>
  );
};

FillAssetsList.propTypes = {
  assets: PropTypes.arrayOf(
    PropTypes.shape({
      amount: PropTypes.string,
      tokenAddress: PropTypes.string.isRequired,
      tokenId: PropTypes.number,
      tokenSymbol: PropTypes.string,
      type: PropTypes.string.isRequired,
    }),
  ).isRequired,
  condensed: PropTypes.bool,
};

FillAssetsList.defaultProps = {
  condensed: false,
};

export default FillAssetsList;

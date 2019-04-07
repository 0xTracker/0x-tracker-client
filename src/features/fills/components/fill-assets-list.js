import PropTypes from 'prop-types';
import React from 'react';

import FillAsset from './fill-asset';
import List from '../../../components/list';
import ListItem from '../../../components/list-item';

const FillAssetsList = ({ assets }) => {
  if (assets.length === 0) {
    return null;
  }

  return (
    <List>
      {assets.map((asset, index) => {
        return (
          // eslint-disable-next-line react/no-array-index-key
          <ListItem key={index}>
            <FillAsset asset={asset} />
          </ListItem>
        );
      })}
    </List>
  );
};

FillAssetsList.propTypes = {
  assets: PropTypes.arrayOf(
    PropTypes.shape({
      amount: PropTypes.string,
      tokenAddress: PropTypes.string.isRequired,
      tokenId: PropTypes.string,
      tokenSymbol: PropTypes.string,
      type: PropTypes.string.isRequired,
    }),
  ).isRequired,
};

export default FillAssetsList;

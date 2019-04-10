import PropTypes from 'prop-types';
import React from 'react';

import FillAsset from './fill-asset';
import List from '../../../components/list';
import ListItem from '../../../components/list-item';

const FillAssetsList = ({ assets, condensed }) => {
  if (assets.length === 0) {
    return null;
  }

  return (
    <List>
      {assets.map((asset, index) => (
        // eslint-disable-next-line react/no-array-index-key
        <ListItem key={index}>
          <FillAsset asset={asset} condensed={condensed} />
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
      tokenId: PropTypes.string,
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

import PropTypes from 'prop-types';
import React from 'react';

import { COLORS } from '../../../styles/constants';
import AssetAmount from './asset-amount';
import AssetLabel from './asset-label';
import Badge from '../../../components/badge';
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
          <AssetAmount asset={asset} />{' '}
          <AssetLabel
            asset={asset}
            condensed={condensed}
            css={`
              color: ${COLORS.PRIMARY.SCAMPI_500};
            `}
          />
          <Badge css="margin-left: 0.75rem;">{asset.traderType}</Badge>
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

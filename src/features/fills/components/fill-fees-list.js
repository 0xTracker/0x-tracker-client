import PropTypes from 'prop-types';
import React from 'react';

import AssetTypeBadge from './asset-type-badge';
import FeeAmount from './fee-amount';
import List from '../../../components/list';
import ListItem from '../../../components/list-item';
import TokenLabel from './token-label';

const FillFeesList = ({ condensed, fees }) => {
  if (fees.length === 0) {
    return null;
  }

  return (
    <List>
      {fees.map((fee, index) => (
        // eslint-disable-next-line react/no-array-index-key
        <ListItem key={index}>
          <FeeAmount fee={fee} />
          <TokenLabel condensed={condensed} token={fee.token} />{' '}
          {fee.token.type === 'erc-721' && (
            <AssetTypeBadge>ERC-721</AssetTypeBadge>
          )}
          {fee.token.type === 'erc-20' && (
            <AssetTypeBadge>ERC-20</AssetTypeBadge>
          )}
        </ListItem>
      ))}
    </List>
  );
};

FillFeesList.propTypes = {
  condensed: PropTypes.bool,
  fees: PropTypes.arrayOf(
    PropTypes.shape({
      amount: PropTypes.shape({
        USD: PropTypes.number.isRequired,
        token: PropTypes.string.isRequired,
      }),
      token: PropTypes.shape({
        address: PropTypes.string.isRequired,
        id: PropTypes.number,
        name: PropTypes.string.isRequired,
        symbol: PropTypes.string,
        type: PropTypes.string,
      }).isRequired,
    }),
  ).isRequired,
};

FillFeesList.defaultProps = {
  condensed: false,
};

export default FillFeesList;

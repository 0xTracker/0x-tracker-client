import PropTypes from 'prop-types';
import React from 'react';

import { COLORS } from '../../../styles/constants';
import FeeAmount from './fee-amount';
import List from '../../../components/list';
import ListItem from '../../../components/list-item';
import TokenLabel from './token-label';
import TokenTypeBadge from '../../tokens/components/token-type-badge';

const FillFeesList = ({ condensed, fees }) => {
  if (fees.length === 0) {
    return 'None';
  }

  return (
    <List>
      {fees.map((fee, index) => (
        // eslint-disable-next-line react/no-array-index-key
        <ListItem key={index}>
          <FeeAmount fee={fee} />
          <TokenLabel
            condensed={condensed}
            css={`
              color: ${COLORS.PRIMARY.SCAMPI_500};
            `}
            token={fee.token}
          />{' '}
          <TokenTypeBadge>{fee.token.type}</TokenTypeBadge>
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

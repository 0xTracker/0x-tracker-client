import _ from 'lodash';

import formatTokenAmount from '../../../util/format-token-amount';

const FeeAmount = ({ fee }) => {
  if (fee.token.type === 'erc-721' || !_.has(fee, 'amount.token')) {
    return null;
  }

  return `${formatTokenAmount(fee.amount.token)} `;
};

export default FeeAmount;

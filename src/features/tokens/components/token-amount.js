import PropTypes from 'prop-types';
import React from 'react';

import buildTokenUrl from '../util/build-token-url';
import formatToken from '../../../util/format-token';
import Link from '../../../components/link';

const TokenAmount = ({ amount, linked, token }) => {
  if (amount === null) {
    return 'Unknown';
  }

  return linked ? (
    <span title={`${amount} ${token.symbol}`}>
      {formatToken(amount)}{' '}
      <Link href={buildTokenUrl(token)}>{token.symbol}</Link>
    </span>
  ) : (
    `${formatToken(amount)} ${token.symbol}`
  );
};

TokenAmount.propTypes = {
  amount: PropTypes.string.isRequired,
  linked: PropTypes.bool,
  token: PropTypes.shape({
    address: PropTypes.string.isRequired,
    symbol: PropTypes.string.isRequired,
  }),
};

TokenAmount.defaultProps = {
  linked: true,
  token: undefined,
};

export default TokenAmount;

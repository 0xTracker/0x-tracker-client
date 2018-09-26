import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import React from 'react';

import buildTokenUrl from '../util/build-token-url';
import formatToken from '../../../util/format-token';

const TokenAmount = ({ amount, token }) =>
  amount === null ? (
    'Unknown'
  ) : (
    <span title={`${amount} ${token.symbol}`}>
      {formatToken(amount)}{' '}
      <Link to={buildTokenUrl(token)}>{token.symbol}</Link>
    </span>
  );

TokenAmount.propTypes = {
  amount: PropTypes.string.isRequired,
  token: PropTypes.shape({
    address: PropTypes.string.isRequired,
    symbol: PropTypes.string.isRequired,
  }),
};

TokenAmount.defaultProps = {
  token: undefined,
};

export default TokenAmount;

import PropTypes from 'prop-types';
import React from 'react';

import LocalisedAmount from '../../currencies/components/localised-amount';
import TokenAmount from './token-amount';

const MarketCapWidgetTooltip = ({ token }) => {
  if (token.marketCap === null) {
    return 'The market cap for this token is unavailable';
  }

  if (token.circulatingSupply === null) {
    return (
      <>
        Current market cap of the token. Calculated by multiplying current price
        of{' '}
        <strong>
          <LocalisedAmount amount={token.price.close} />
        </strong>{' '}
        by total supply of{' '}
        <strong>
          <TokenAmount
            amount={token.totalSupply}
            linked={false}
            token={token}
          />
        </strong>
        .
      </>
    );
  }

  return (
    <>
      Current market cap of the token. Calculated by multipling current price of{' '}
      <strong>
        <LocalisedAmount amount={token.price.close} />
      </strong>{' '}
      by circulating supply of{' '}
      <strong>
        <TokenAmount
          amount={token.circulatingSupply}
          linked={false}
          token={token}
        />
      </strong>
      .
    </>
  );
};

MarketCapWidgetTooltip.propTypes = {
  token: PropTypes.shape({
    circulatingSupply: PropTypes.number,
    marketCap: PropTypes.number,
    price: PropTypes.shape({
      close: PropTypes.number,
    }).isRequired,
    totalSupply: PropTypes.number,
  }).isRequired,
};

export default MarketCapWidgetTooltip;

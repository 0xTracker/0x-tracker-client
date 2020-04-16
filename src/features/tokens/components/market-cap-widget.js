import PropTypes from 'prop-types';
import React from 'react';

import LoadingIndicator from '../../../components/loading-indicator';
import LocalisedAmount from '../../currencies/components/localised-amount';
import StatWidget from '../../../components/stat-widget';
import TokenMarketCapTooltip from './token-market-cap-tooltip';

const loadingIndicator = <LoadingIndicator size="small" type="cylon" />;

const MarketCapWidget = ({ token, ...otherProps }) => (
  <StatWidget
    title="Market Cap"
    tooltip={<TokenMarketCapTooltip token={token} />}
    {...otherProps}
  >
    {token.marketCap === null ? (
      'Not Available'
    ) : (
      <LocalisedAmount
        amount={token.marketCap}
        loadingIndicator={loadingIndicator}
        summarize
      />
    )}
  </StatWidget>
);

MarketCapWidget.propTypes = {
  token: PropTypes.shape({
    circulatingSupply: PropTypes.number,
    className: PropTypes.string,
    marketCap: PropTypes.number,
    price: PropTypes.shape({
      close: PropTypes.number,
    }).isRequired,
    totalSupply: PropTypes.number,
  }).isRequired,
};

export default MarketCapWidget;

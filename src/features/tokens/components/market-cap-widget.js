import PropTypes from 'prop-types';
import React from 'react';

import LoadingIndicator from '../../../components/loading-indicator';
import LocalisedAmount from '../../currencies/components/localised-amount';
import MarketCapWidgetTooltip from './market-cap-widget-tooltip';
import StatWidget from '../../../components/stat-widget';

const loadingIndicator = <LoadingIndicator size="small" type="cylon" />;

const MarketCapWidget = ({ token, ...otherProps }) => (
  <StatWidget
    title="Market Cap"
    tooltip={<MarketCapWidgetTooltip token={token} />}
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

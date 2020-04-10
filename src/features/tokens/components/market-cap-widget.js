import PropTypes from 'prop-types';
import React from 'react';

import LoadingIndicator from '../../../components/loading-indicator';
import LocalisedAmount from '../../currencies/components/localised-amount';
import Number from '../../../components/number';
import StatWidget from '../../../components/stat-widget';

const loadingIndicator = <LoadingIndicator size="small" type="cylon" />;

const MarketCapWidget = ({
  circulatingSupply,
  marketCap,
  price,
  ...otherProps
}) => (
  <StatWidget
    title="Market Cap"
    tooltip={
      <>
        Current market cap based on a price of{' '}
        <strong>
          <LocalisedAmount amount={price.last} />
        </strong>{' '}
        and circulating supply of{' '}
        <strong>
          <Number>{circulatingSupply}</Number>
        </strong>
        .
      </>
    }
    {...otherProps}
  >
    <LocalisedAmount
      amount={marketCap}
      loadingIndicator={loadingIndicator}
      summarize
    />
  </StatWidget>
);

MarketCapWidget.propTypes = {
  circulatingSupply: PropTypes.number, // eslint-disable-line react/require-default-props
  className: PropTypes.string,
  marketCap: PropTypes.number, // eslint-disable-line react/require-default-props
  price: PropTypes.number, // eslint-disable-line react/require-default-props
};

MarketCapWidget.defaultProps = {
  className: undefined,
};

export default MarketCapWidget;

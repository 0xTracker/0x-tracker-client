import numeral from 'numeral';
import PropTypes from 'prop-types';
import React from 'react';

import { prettyPeriod } from '../../../util';
import LocalisedAmount from '../../currencies/components/localised-amount';

const determinePrecision = (value) => (value < 1 ? 5 : 2);

const TokenPriceTooltip = ({ period, price }) => (
  <dl>
    <div>
      <dt>Open:</dt>
      <dd>
        {price.open === null ? (
          'Unknown'
        ) : (
          <LocalisedAmount
            amount={price.open}
            preferredPrecision={determinePrecision(price.open)}
          />
        )}
      </dd>
    </div>
    <div>
      <dt>High:</dt>
      <dd>
        <LocalisedAmount
          amount={price.high}
          preferredPrecision={determinePrecision(price.high)}
        />
      </dd>
    </div>
    <div>
      <dt>Low:</dt>
      <dd>
        <LocalisedAmount
          amount={price.low}
          preferredPrecision={determinePrecision(price.low)}
        />
      </dd>
    </div>
    <div>
      <dt>Close:</dt>
      <dd>
        <LocalisedAmount
          amount={price.close}
          preferredPrecision={determinePrecision(price.close)}
        />
      </dd>
    </div>
    <div>
      <dt>Change ({prettyPeriod(period)}):</dt>
      <dd>
        {price.change === null
          ? 'Unknown'
          : `${numeral(price.change).format('0.[00]')}%`}
      </dd>
    </div>
  </dl>
);

TokenPriceTooltip.propTypes = {
  period: PropTypes.string.isRequired,
  price: PropTypes.shape({
    change: PropTypes.number,
    close: PropTypes.number,
    high: PropTypes.number,
    low: PropTypes.number,
    open: PropTypes.number,
  }).isRequired,
};

export default TokenPriceTooltip;

import _ from 'lodash';
import React from 'react';

import NetworkVolume from '../../metrics/components/network-volume';
import GranularityPill from '../../../components/granularity-pill';
import { TIME_PERIOD } from '../../../constants';
import Card from '../../../components/card';
import CardHeader from '../../../components/card-header';
import CardHeading from '../../../components/card-heading';
import CardBody from '../../../components/card-body';
import granularityValidForPeriod from '../../../util/granularity-valid-for-period';
import DropdownPill from '../../../components/dropdown-pill';
import sharedPropTypes from '../../../prop-types';

const getDefaultGranularity = (period) => {
  if (_.isPlainObject(period)) {
    return undefined; // Defer to API
  }

  if (period === TIME_PERIOD.ALL) {
    return 'month';
  }

  if (period === TIME_PERIOD.YEAR) {
    return 'week';
  }

  if (period === TIME_PERIOD.MONTH) {
    return 'day';
  }

  return 'hour';
};

const TradingMetricsCard = ({ period }) => {
  const [type, setType] = React.useState('volume');
  const [granularityPreference, setGranularityPreference] = React.useState();

  const granularity =
    granularityPreference === undefined ||
    !granularityValidForPeriod(granularityPreference, period)
      ? getDefaultGranularity(period)
      : granularityPreference;

  return (
    <Card errorMessage="An error occurred while loading the chart">
      <CardHeader>
        <CardHeading>Trading Metrics</CardHeading>
        <div css="display: flex;">
          <DropdownPill
            css="margin-right: 0.5rem;"
            onChange={setType}
            options={[
              { label: 'Trades', value: 'trades' },
              { label: 'Volume', value: 'volume' },
            ]}
            value={type}
          />
          <GranularityPill
            onChange={setGranularityPreference}
            period={period}
            value={granularity}
          />
        </div>
      </CardHeader>
      <CardBody padded>
        {type === 'volume' && (
          <NetworkVolume granularity={granularity} period={period} />
        )}
        {type === 'trades' && (
          <NetworkVolume
            granularity={granularity}
            period={period}
            type="tradeCount"
          />
        )}
      </CardBody>
    </Card>
  );
};

TradingMetricsCard.propTypes = {
  period: sharedPropTypes.timePeriod.isRequired,
};

export default TradingMetricsCard;

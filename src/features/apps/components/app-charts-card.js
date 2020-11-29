import PropTypes from 'prop-types';
import React from 'react';

import AppMetrics from './app-metrics';
import AppTradingVolume from './app-trading-volume';
import Card from '../../../components/card';
import CardHeader from '../../../components/card-header';
import CardHeading from '../../../components/card-heading';
import CardBody from '../../../components/card-body';
import DropdownPill from '../../../components/dropdown-pill';
import GranularityPill from '../../../components/granularity-pill';
import { METRIC_GRANULARITY, TIME_PERIOD } from '../../../constants';
import granularityValidForPeriod from '../../../util/granularity-valid-for-period';
import sharedPropTypes from '../../../prop-types';

const getDefaultGranularity = (period) => {
  if (period === TIME_PERIOD.ALL) {
    return METRIC_GRANULARITY.WEEK;
  }

  if (period === TIME_PERIOD.YEAR) {
    return METRIC_GRANULARITY.DAY;
  }

  if (period === TIME_PERIOD.MONTH) {
    return METRIC_GRANULARITY.DAY;
  }

  return METRIC_GRANULARITY.HOUR;
};

const AppChartsCard = ({ appId, statsPeriod }) => {
  const [type, setType] = React.useState('volume');
  const [granularityPreference, setGranularityPreference] = React.useState();

  const granularity =
    granularityPreference === undefined ||
    !granularityValidForPeriod(granularityPreference, statsPeriod)
      ? getDefaultGranularity(statsPeriod)
      : granularityPreference;

  return (
    <Card>
      <CardHeader>
        <CardHeading>Charts</CardHeading>
        <div css="display: flex;">
          <DropdownPill
            css="margin-right: 0.5rem;"
            onChange={setType}
            options={[
              { label: 'Active Traders', value: 'active-traders' },
              { label: 'Trades', value: 'trades' },
              { label: 'Volume', value: 'volume' },
            ]}
            value={type}
          />
          <GranularityPill
            onChange={setGranularityPreference}
            period={statsPeriod}
            value={granularity}
          />
        </div>
      </CardHeader>
      <CardBody padded>
        {(type === 'volume' || type === 'trades') && (
          <AppTradingVolume
            appId={appId}
            granularity={granularity}
            period={statsPeriod}
            type={type === 'volume' ? 'tradeVolume' : 'tradeCount'}
          />
        )}
        {type === 'active-traders' && (
          <AppMetrics appId={appId} period={statsPeriod} type="activeTraders" />
        )}
      </CardBody>
    </Card>
  );
};

AppChartsCard.propTypes = {
  appId: PropTypes.string.isRequired,
  statsPeriod: sharedPropTypes.timePeriod.isRequired,
};

export default AppChartsCard;

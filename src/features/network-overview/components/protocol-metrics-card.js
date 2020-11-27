import _ from 'lodash';
import React from 'react';

import Card from '../../../components/card';
import CardBody from '../../../components/card-body';
import CardHeader from '../../../components/card-header';
import CardHeading from '../../../components/card-heading';
import DropdownPill from '../../../components/dropdown-pill';
import GranularityPill from '../../../components/granularity-pill';
import { TIME_PERIOD } from '../../../constants';
import sharedPropTypes from '../../../prop-types';
import granularityValidForPeriod from '../../../util/granularity-valid-for-period';
import NetworkMetrics from '../../metrics/components/network-metrics';
import ProtocolMetrics from '../../metrics/components/protocol-metrics';

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

const ProtocolMetricsCard = ({ period }) => {
  const [type, setType] = React.useState('adoption-by-trades');
  const [granularityPreference, setGranularityPreference] = React.useState();

  const granularity =
    granularityPreference === undefined ||
    !granularityValidForPeriod(granularityPreference, period)
      ? getDefaultGranularity(period)
      : granularityPreference;

  return (
    <Card errorMessage="An error occurred while loading the chart">
      <CardHeader>
        <CardHeading>Protocol Metrics</CardHeading>
        <div css="display: flex;">
          <DropdownPill
            css="margin-right: 0.5rem;"
            onChange={setType}
            options={[
              { label: 'Adoption (by trades)', value: 'adoption-by-trades' },
              { label: 'Adoption (by volume)', value: 'adoption-by-volume' },
              { label: 'Collected Fees', value: 'fees' },
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
        {type === 'adoption-by-trades' && (
          <ProtocolMetrics
            compareBy="tradeCount"
            granularity={granularity}
            period={period}
          />
        )}
        {type === 'adoption-by-volume' && (
          <ProtocolMetrics
            compareBy="tradeVolume"
            granularity={granularity}
            period={period}
          />
        )}
        {type === 'fees' && (
          <NetworkMetrics
            granularity={granularity}
            period={period}
            type="protocolFees"
          />
        )}
      </CardBody>
    </Card>
  );
};

ProtocolMetricsCard.propTypes = {
  period: sharedPropTypes.timePeriod.isRequired,
};

export default ProtocolMetricsCard;

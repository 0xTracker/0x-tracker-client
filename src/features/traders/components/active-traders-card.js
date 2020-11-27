import _ from 'lodash';
import React from 'react';

import ActiveTraderMetrics from '../../metrics/components/active-trader-metrics';
import Card from '../../../components/card';
import CardBody from '../../../components/card-body';
import CardHeading from '../../../components/card-heading';
import CardHeader from '../../../components/card-header';
import sharedPropTypes from '../../../prop-types';
import DropdownPill from '../../../components/dropdown-pill';
import GranularityPill from '../../../components/granularity-pill';
import granularityValidForPeriod from '../../../util/granularity-valid-for-period';
import { TIME_PERIOD } from '../../../constants';

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

const ActiveTradersCard = ({ period }) => {
  const [type, setType] = React.useState('traderCount');
  const [granularityPreference, setGranularityPreference] = React.useState();

  const granularity =
    granularityPreference === undefined ||
    !granularityValidForPeriod(granularityPreference, period)
      ? getDefaultGranularity(period)
      : granularityPreference;

  return (
    <Card css="height: 360px;">
      <CardHeader>
        <CardHeading>Active Traders</CardHeading>
        <div css="display: flex;">
          <DropdownPill
            css="margin-right: 0.5rem;"
            onChange={setType}
            options={[
              { label: 'Active Makers', value: 'makerCount' },
              { label: 'Active Takers', value: 'takerCount' },
              { label: 'Active Traders', value: 'traderCount' },
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
        <ActiveTraderMetrics
          granularity={granularity}
          period={period}
          type={type}
        />
      </CardBody>
    </Card>
  );
};

ActiveTradersCard.propTypes = {
  period: sharedPropTypes.timePeriod.isRequired,
};

export default ActiveTradersCard;

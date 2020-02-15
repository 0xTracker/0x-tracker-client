import React from 'react';

import { URL } from '../../../constants';
import ActiveTraderMetrics from '../../metrics/components/active-trader-metrics';
import Card from '../../../components/card';
import CardBody from '../../../components/card-body';
import CardHeading from '../../../components/card-heading';
import CardHeader from '../../../components/card-header';
import Link from '../../../components/link';
import Pill from '../../../components/pill';
import sharedPropTypes from '../../../prop-types';

const ActiveTradersCard = ({ period }) => (
  <Card css="height: 360px;">
    <CardHeader>
      <CardHeading>Active Traders</CardHeading>
      <Pill as={Link} href={`${URL.TRADERS}?statsPeriod=${period}`}>
        View Traders
      </Pill>
    </CardHeader>
    <CardBody padded>
      <ActiveTraderMetrics period={period} />
    </CardBody>
  </Card>
);

ActiveTradersCard.propTypes = {
  period: sharedPropTypes.timePeriod.isRequired,
};

export default ActiveTradersCard;

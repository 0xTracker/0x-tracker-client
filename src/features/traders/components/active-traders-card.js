import React from 'react';

import { URL } from '../../../constants';
import BasicCard from '../../../components/basic-card';
import CardBody from '../../../components/card-body';
import CardHeading from '../../../components/card-heading';
import CardHeader from '../../../components/card-header';
import Link from '../../../components/link';
import NetworkVolume from '../../metrics/components/network-volume';
import Pill from '../../../components/pill';
import sharedPropTypes from '../../../prop-types';

const ActiveTradersCard = ({ period }) => (
  <BasicCard>
    <CardHeader>
      <CardHeading>Active Traders</CardHeading>
      <Pill as={Link} href={`${URL.TRADERS}?statsPeriod=${period}`}>
        View Traders
      </Pill>
    </CardHeader>
    <CardBody css="height: 265px;" padded>
      <NetworkVolume period={period} />
    </CardBody>
  </BasicCard>
);

ActiveTradersCard.propTypes = {
  period: sharedPropTypes.timePeriod.isRequired,
};

export default ActiveTradersCard;

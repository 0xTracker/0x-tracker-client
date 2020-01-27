import React from 'react';

import Card from '../../../components/card';
import CardBody from '../../../components/card-body';
import CardHeading from '../../../components/card-heading';
import CardHeader from '../../../components/card-header';
import sharedPropTypes from '../../../prop-types';
import TraderBreakdown from './trader-breakdown';

const TraderTypesCard = ({ period }) => (
  <Card css="height: 360px;">
    <CardHeader>
      <CardHeading>Makers vs. Takers</CardHeading>
    </CardHeader>
    <CardBody padded>
      <TraderBreakdown period={period} />
    </CardBody>
  </Card>
);

TraderTypesCard.propTypes = {
  period: sharedPropTypes.timePeriod,
};

TraderTypesCard.defaultProps = {
  period: undefined,
};

export default TraderTypesCard;

import React from 'react';

import BasicCard from '../../../components/basic-card';
import CardBody from '../../../components/card-body';
import CardHeading from '../../../components/card-heading';
import CardHeader from '../../../components/card-header';
import sharedPropTypes from '../../../prop-types';
import TraderBreakdown from './trader-breakdown';

const TraderTypesCard = ({ period }) => (
  <BasicCard>
    <CardHeader>
      <CardHeading>Trader Types</CardHeading>
    </CardHeader>
    <CardBody css="height: 300px;" padded>
      <TraderBreakdown period={period} />
    </CardBody>
  </BasicCard>
);

TraderTypesCard.propTypes = {
  period: sharedPropTypes.timePeriod,
};

TraderTypesCard.defaultProps = {
  period: undefined,
};

export default TraderTypesCard;

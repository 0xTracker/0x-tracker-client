import React from 'react';

import Card from '../../../components/card';
import CardBody from '../../../components/card-body';
import CardHeading from '../../../components/card-heading';
import CardHeader from '../../../components/card-header';
import sharedPropTypes from '../../../prop-types';
import TopProtocols from './top-protocols';

const TopProtocolsCard = ({ period }) => (
  <Card css="height: 360px;">
    <CardHeader>
      <CardHeading>Protocol Share</CardHeading>
    </CardHeader>
    <CardBody padded>
      <TopProtocols period={period} />
    </CardBody>
  </Card>
);

TopProtocolsCard.propTypes = {
  period: sharedPropTypes.timePeriod,
};

TopProtocolsCard.defaultProps = {
  period: undefined,
};

export default TopProtocolsCard;

import React from 'react';

import BasicCard from '../../../components/basic-card';
import CardBody from '../../../components/card-body';
import CardHeading from '../../../components/card-heading';
import CardHeader from '../../../components/card-header';
import sharedPropTypes from '../../../prop-types';
import TopProtocols from './top-protocols';

const TopProtocolsCard = ({ period }) => (
  <BasicCard>
    <CardHeader>
      <CardHeading>Top Protocols</CardHeading>
    </CardHeader>
    <CardBody css="height: 300px;" padded>
      <TopProtocols period={period} />
    </CardBody>
  </BasicCard>
);

TopProtocolsCard.propTypes = {
  period: sharedPropTypes.timePeriod,
};

TopProtocolsCard.defaultProps = {
  period: undefined,
};

export default TopProtocolsCard;

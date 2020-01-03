import React from 'react';

import Card from '../../../components/card';
import CardBody from '../../../components/card-body';
import CardHeading from '../../../components/card-heading';
import CardHeader from '../../../components/card-header';
import sharedPropTypes from '../../../prop-types';

// eslint-disable-next-line no-unused-vars
const ProtocolVolumeCard = ({ period }) => (
  <Card css="height: 360px;">
    <CardHeader>
      <CardHeading>Protocol Volume</CardHeading>
    </CardHeader>
    <CardBody />
  </Card>
);

ProtocolVolumeCard.propTypes = {
  period: sharedPropTypes.timePeriod,
};

ProtocolVolumeCard.defaultProps = {
  period: undefined,
};

export default ProtocolVolumeCard;

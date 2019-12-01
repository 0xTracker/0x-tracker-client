import React from 'react';

import BasicCard from '../../../components/basic-card';
import CardBody from '../../../components/card-body';
import CardHeading from '../../../components/card-heading';
import CardHeader from '../../../components/card-header';
import sharedPropTypes from '../../../prop-types';

// eslint-disable-next-line no-unused-vars
const ProtocolVolumeCard = ({ period }) => (
  <BasicCard>
    <CardHeader>
      <CardHeading>Protocol Volume</CardHeading>
    </CardHeader>
    <CardBody css="height: 300px;" />
  </BasicCard>
);

ProtocolVolumeCard.propTypes = {
  period: sharedPropTypes.timePeriod,
};

ProtocolVolumeCard.defaultProps = {
  period: undefined,
};

export default ProtocolVolumeCard;

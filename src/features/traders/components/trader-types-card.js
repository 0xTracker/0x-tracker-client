import React from 'react';

import Card from '../../../components/card';
import CardBody from '../../../components/card-body';
import CardFooter from '../../../components/card-footer';
import CardHeading from '../../../components/card-heading';
import CardHeader from '../../../components/card-header';
import Footnote from '../../../components/footnote';
import sharedPropTypes from '../../../prop-types';
import TraderBreakdown from './trader-breakdown';

const TraderTypesCard = ({ period }) => (
  <Card css="height: 360px;">
    <CardHeader>
      <CardHeading>Makers vs. Takers</CardHeading>
    </CardHeader>
    <CardBody css="padding: 2rem;">
      <TraderBreakdown period={period} />
    </CardBody>
    <CardFooter css="text-align: right;">
      <Footnote>Unique traders by type</Footnote>
    </CardFooter>
  </Card>
);

TraderTypesCard.propTypes = {
  period: sharedPropTypes.timePeriod,
};

TraderTypesCard.defaultProps = {
  period: undefined,
};

export default TraderTypesCard;

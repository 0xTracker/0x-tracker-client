import React from 'react';

import { URL } from '../../../constants';
import Card from '../../../components/card';
import CardHeading from '../../../components/card-heading';
import Fills from './fills';
import Link from '../../../components/link';
import Pill from '../../../components/pill';

const RecentFillsCard = () => (
  <Card
    header={
      <React.Fragment>
        <CardHeading>Recent Fills</CardHeading>
        <Pill as={Link} highlighted href={URL.FILLS}>
          View More
        </Pill>
      </React.Fragment>
    }
    padded
  >
    <Fills />
  </Card>
);

export default RecentFillsCard;

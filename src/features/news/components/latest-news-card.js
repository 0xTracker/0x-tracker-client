import React from 'react';

import { URL } from '../../../constants';
import Card from '../../../components/card';
import CardHeading from '../../../components/card-heading';
import LatestNews from './latest-news';
import Link from '../../../components/link';
import Pill from '../../../components/pill';

const LatestNewsCard = () => (
  <Card
    header={
      <React.Fragment>
        <CardHeading>Latest News</CardHeading>
        <Pill as={Link} highlighted href={URL.NEWS}>
          View More
        </Pill>
      </React.Fragment>
    }
    padded
  >
    <LatestNews />
  </Card>
);

export default LatestNewsCard;

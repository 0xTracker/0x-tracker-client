import PropTypes from 'prop-types';
import React from 'react';

import { URL } from '../../../constants';
import Card from '../../../components/card';
import CardBody from '../../../components/card-body';
import CardHeader from '../../../components/card-header';
import CardHeading from '../../../components/card-heading';
import LatestNews from './latest-news';
import Link from '../../../components/link';
import Pill from '../../../components/pill';

const LatestNewsCard = ({ compact, showImages, ...otherProps }) => (
  <Card {...otherProps}>
    <CardHeader>
      <CardHeading>Latest News</CardHeading>
      <Pill as={Link} href={URL.NEWS}>
        View More
      </Pill>
    </CardHeader>
    <CardBody>
      <LatestNews compact={compact} showImages={showImages} />
    </CardBody>
  </Card>
);

LatestNewsCard.propTypes = {
  compact: PropTypes.bool,
  showImages: PropTypes.bool,
};

LatestNewsCard.defaultProps = {
  compact: undefined,
  showImages: undefined,
};

export default LatestNewsCard;

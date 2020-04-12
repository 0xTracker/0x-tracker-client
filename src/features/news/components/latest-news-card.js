import PropTypes from 'prop-types';
import React from 'react';

import { URL } from '../../../constants';
import { colors } from '../../../styles/constants';
import Card from '../../../components/card';
import CardBody from '../../../components/card-body';
import CardHeader from '../../../components/card-header';
import CardHeading from '../../../components/card-heading';
import LatestNews from './latest-news';
import Link from '../../../components/link';
import Pill from '../../../components/pill';

const LatestNewsCard = ({ className, compact, showImages }) => (
  <Card className={className}>
    <CardHeader>
      <CardHeading>Latest News</CardHeading>
      <Pill as={Link} href={URL.NEWS}>
        View More
      </Pill>
    </CardHeader>
    <CardBody
      css={`
        background-color: ${colors.alabaster};
      `}
    >
      <LatestNews compact={compact} showImages={showImages} />
    </CardBody>
  </Card>
);

LatestNewsCard.propTypes = {
  className: PropTypes.string,
  compact: PropTypes.bool,
  showImages: PropTypes.bool,
};

LatestNewsCard.defaultProps = {
  className: undefined,
  compact: undefined,
  showImages: undefined,
};

export default LatestNewsCard;

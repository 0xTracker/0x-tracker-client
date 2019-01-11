import PropTypes from 'prop-types';
import React from 'react';

import { URL } from '../../../constants';
import Card from '../../../components/card';
import CardHeading from '../../../components/card-heading';
import Link from '../../../components/link';
import Pill from '../../../components/pill';
import RecentFills from './recent-fills';

const RecentFillsCard = ({ className }) => (
  <Card
    className={className}
    header={
      <>
        <CardHeading>Recent Fills</CardHeading>
        <Pill as={Link} highlighted href={URL.FILLS}>
          View More
        </Pill>
      </>
    }
    padded
  >
    <RecentFills />
  </Card>
);

RecentFillsCard.propTypes = {
  className: PropTypes.string,
};

RecentFillsCard.defaultProps = {
  className: undefined,
};

export default RecentFillsCard;

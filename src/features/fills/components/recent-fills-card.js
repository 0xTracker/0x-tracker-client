import PropTypes from 'prop-types';
import React from 'react';

import { URL } from '../../../constants';
import Card from '../../../components/card';
import CardBody from '../../../components/card-body';
import CardHeader from '../../../components/card-header';
import CardHeading from '../../../components/card-heading';
import Link from '../../../components/link';
import Pill from '../../../components/pill';
import RecentFills from './recent-fills';

const RecentFillsCard = ({ className, filter, limit, placeholder }) => (
  <Card className={className}>
    <CardHeader>
      <CardHeading>Recent Fills</CardHeading>
      <Pill as={Link} href={URL.FILLS}>
        View More
      </Pill>
    </CardHeader>
    <CardBody>
      <RecentFills filter={filter} limit={limit} placeholder={placeholder} />
    </CardBody>
  </Card>
);

RecentFillsCard.propTypes = {
  className: PropTypes.string,
  filter: PropTypes.shape({
    address: PropTypes.string,
    relayer: PropTypes.string,
    token: PropTypes.string,
  }),
  limit: PropTypes.number,
  placeholder: PropTypes.string,
};

RecentFillsCard.defaultProps = {
  className: undefined,
  filter: undefined,
  limit: undefined,
  placeholder: undefined,
};

export default RecentFillsCard;

import PropTypes from 'prop-types';
import React from 'react';

import { URL } from '../../../constants';
import { buildUrl } from '../../../util';
import Card from '../../../components/card';
import CardBody from '../../../components/card-body';
import CardHeader from '../../../components/card-header';
import CardHeading from '../../../components/card-heading';
import Link from '../../../components/link';
import Pill from '../../../components/pill';
import RecentFills from './recent-fills';

const RecentFillsCard = ({ filter, limit, placeholder, ...otherProps }) => (
  <Card
    errorMessage="An error occurred while loading recent trades"
    {...otherProps}
  >
    <CardHeader>
      <CardHeading>Recent Trades</CardHeading>
      <Pill as={Link} href={buildUrl(URL.FILLS, filter)}>
        View More
      </Pill>
    </CardHeader>
    <CardBody>
      <RecentFills filter={filter} limit={limit} placeholder={placeholder} />
    </CardBody>
  </Card>
);

RecentFillsCard.propTypes = {
  filter: PropTypes.shape({
    address: PropTypes.string,
    apps: PropTypes.arrayOf(PropTypes.string.isRequired),
    token: PropTypes.string,
  }),
  limit: PropTypes.number,
  placeholder: PropTypes.string,
};

RecentFillsCard.defaultProps = {
  filter: undefined,
  limit: undefined,
  placeholder: undefined,
};

export default RecentFillsCard;

import PropTypes from 'prop-types';
import React from 'react';

import Card from '../../../components/card';
import CardBody from '../../../components/card-body';
import CardHeader from '../../../components/card-header';
import CardHeading from '../../../components/card-heading';
import PaginationPills from '../../../components/pagination-pills';
import tokenPropTypes from '../prop-types';
import TokenRelayers from './token-relayers';

const TokenRelayersCard = ({ className, limit, statsPeriod, token }) => (
  <Card className={className}>
    <CardHeader>
      <CardHeading>Relayers</CardHeading>
      <PaginationPills page={1} pageCount={1} />
    </CardHeader>
    <CardBody>
      <TokenRelayers limit={limit} statsPeriod={statsPeriod} token={token} />
    </CardBody>
  </Card>
);

TokenRelayersCard.propTypes = {
  className: PropTypes.string,
  limit: PropTypes.number,
  statsPeriod: PropTypes.string.isRequired,
  token: tokenPropTypes.tokenWithStats.isRequired,
};

TokenRelayersCard.defaultProps = {
  className: undefined,
  limit: undefined,
};

export default TokenRelayersCard;

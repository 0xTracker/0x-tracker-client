/* eslint-disable no-nested-ternary */
import _ from 'lodash';
import PropTypes from 'prop-types';
import React from 'react';

import Card from '../../../components/card';
import CardBody from '../../../components/card-body';
import CardHeader from '../../../components/card-header';
import CardHeading from '../../../components/card-heading';
import CardPlaceholder from '../../../components/card-placeholder';
import LoadingIndicator from '../../../components/loading-indicator';
import PaginationPills from '../../../components/pagination-pills';
import tokenPropTypes from '../prop-types';
import TokenRelayersTable from './token-relayers-table';
import useTokenRelayers from '../hooks/use-token-relayers';

const TokenRelayersCard = ({ className, limit, statsPeriod, token }) => {
  const [page, setPage] = React.useState(1);
  const [relayers, loadingRelayers] = useTokenRelayers(token.address, {
    autoReload: true,
    limit,
    page,
    sortBy: 'tradeVolumeUSD',
    statsPeriod,
  });

  return (
    <Card className={className}>
      <CardHeader>
        <CardHeading>Relayers</CardHeading>
        {_.isObject(relayers) && (
          <PaginationPills
            onPageChange={(newPage) => setPage(newPage)}
            page={page}
            pageCount={relayers.pageCount}
          />
        )}
      </CardHeader>
      <CardBody>
        {loadingRelayers ? (
          <LoadingIndicator centered />
        ) : relayers.items.length === 0 ? (
          <CardPlaceholder>
            No trading activity has been recorded for this token on known
            relayers in the selected period.
          </CardPlaceholder>
        ) : (
          <TokenRelayersTable relayers={relayers.items} token={token} />
        )}
      </CardBody>
    </Card>
  );
};

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
/* eslint-enable no-nested-ternary */

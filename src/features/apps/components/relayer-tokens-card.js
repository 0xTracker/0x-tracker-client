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
import RelayerTokensTable from './relayer-tokens-table';
import useRelayerTokens from '../hooks/use-relayer-tokens';

const RelayerTokensCard = ({ className, limit, relayerSlug, statsPeriod }) => {
  const [page, setPage] = React.useState(1);
  const [tokens, loadingTokens] = useRelayerTokens(relayerSlug, {
    autoReload: true,
    limit,
    page,
    sortBy: 'tradeVolumeUSD',
    statsPeriod,
  });

  return (
    <Card className={className}>
      <CardHeader>
        <CardHeading>Traded Tokens</CardHeading>
        {_.isObject(tokens) && (
          <PaginationPills
            onPageChange={(newPage) => setPage(newPage)}
            page={page}
            pageCount={tokens.pageCount}
          />
        )}
      </CardHeader>
      <CardBody>
        {loadingTokens ? (
          <LoadingIndicator centered />
        ) : tokens.items.length === 0 ? (
          <CardPlaceholder>
            No trading activity has been recorded for this relayer in the
            selected period.
          </CardPlaceholder>
        ) : (
          <RelayerTokensTable tokens={tokens.items} />
        )}
      </CardBody>
    </Card>
  );
};

RelayerTokensCard.propTypes = {
  className: PropTypes.string,
  limit: PropTypes.number,
  relayerSlug: PropTypes.string.isRequired,
  statsPeriod: PropTypes.string.isRequired,
};

RelayerTokensCard.defaultProps = {
  className: undefined,
  limit: undefined,
};

export default RelayerTokensCard;
/* eslint-enable no-nested-ternary */

/* eslint-disable no-nested-ternary */
import _ from 'lodash';
import PropTypes from 'prop-types';
import React from 'react';

import AppTokensTable from './app-tokens-table';
import Card from '../../../components/card';
import CardBody from '../../../components/card-body';
import CardHeader from '../../../components/card-header';
import CardHeading from '../../../components/card-heading';
import CardPlaceholder from '../../../components/card-placeholder';
import LoadingIndicator from '../../../components/loading-indicator';
import PaginationPills from '../../../components/pagination-pills';
import useAppTokens from '../hooks/use-app-tokens';

const AppTokensCard = ({ appSlug, className, limit, statsPeriod }) => {
  const [page, setPage] = React.useState(1);
  const [tokens, loadingTokens] = useAppTokens(appSlug, {
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
            No trading activity has been recorded for this app in the selected
            period.
          </CardPlaceholder>
        ) : (
          <AppTokensTable tokens={tokens.items} />
        )}
      </CardBody>
    </Card>
  );
};

AppTokensCard.propTypes = {
  appSlug: PropTypes.string.isRequired,
  className: PropTypes.string,
  limit: PropTypes.number,
  statsPeriod: PropTypes.string.isRequired,
};

AppTokensCard.defaultProps = {
  className: undefined,
  limit: undefined,
};

export default AppTokensCard;
/* eslint-enable no-nested-ternary */

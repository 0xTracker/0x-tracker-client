/* eslint-disable no-nested-ternary */
import _ from 'lodash';
import PropTypes from 'prop-types';
import React from 'react';

import appsPropTypes from '../prop-types';
import AppTokensTable from './app-tokens-table';
import Card from '../../../components/card';
import CardBody from '../../../components/card-body';
import CardHeader from '../../../components/card-header';
import CardHeading from '../../../components/card-heading';
import CardPlaceholder from '../../../components/card-placeholder';
import LoadingIndicator from '../../../components/loading-indicator';
import PaginationPills from '../../../components/pagination-pills';
import useAppTokens from '../hooks/use-app-tokens';
import CardFooter from '../../../components/card-footer';
import DropdownPill from '../../../components/dropdown-pill';

const AppTokensCard = ({ app, className, limit, statsPeriod }) => {
  const [sortBy, setSortBy] = React.useState('tradeVolumeUSD');
  const [page, setPage] = React.useState(1);
  const [tokens, loading] = useAppTokens(app.urlSlug, {
    autoReload: true,
    limit,
    page,
    sortBy,
    statsPeriod,
  });

  return (
    <Card className={className}>
      <CardHeader>
        <CardHeading>Traded Tokens</CardHeading>
        <DropdownPill
          onChange={setSortBy}
          options={[
            { label: 'By Trades', value: 'tradeCount' },
            { label: 'By Volume', value: 'tradeVolumeUSD' },
          ]}
          value={sortBy}
        />
      </CardHeader>
      <CardBody>
        {loading ? (
          <LoadingIndicator centered />
        ) : tokens.items.length === 0 ? (
          <CardPlaceholder>
            No trading activity has been recorded for this app in the selected
            period.
          </CardPlaceholder>
        ) : (
          <AppTokensTable appName={app.name} tokens={tokens.items} />
        )}
      </CardBody>
      <CardFooter css="align-items: center; display: flex; justify-content: space-between;">
        {tokens.total > 0 && (
          <span>
            Showing {(page - 1) * limit + 1} to{' '}
            {_.clamp(page * limit, 0, tokens.total)} of {tokens.total} tokens
          </span>
        )}
        {_.isObject(tokens) && (
          <PaginationPills
            onPageChange={(newPage) => setPage(newPage)}
            page={page}
            pageCount={tokens.pageCount}
          />
        )}
      </CardFooter>
    </Card>
  );
};

AppTokensCard.propTypes = {
  app: appsPropTypes.app.isRequired,
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

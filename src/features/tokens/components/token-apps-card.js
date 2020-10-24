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
import TokenAppsTable from './token-apps-table';
import useTokenApps from '../hooks/use-token-apps';
import HelpWidget from '../../../components/help-widget';

const TokenAppsCard = ({ className, limit, statsPeriod, token }) => {
  const [page, setPage] = React.useState(1);
  const [apps, loading] = useTokenApps(token.address, {
    autoReload: true,
    limit,
    page,
    sortBy: 'tradeVolumeUSD',
    statsPeriod,
  });

  return (
    <Card className={className}>
      <CardHeader>
        <CardHeading>
          Associated Apps{' '}
          <HelpWidget>
            Apps which {token.name || 'this token'} has been traded through in
            the selected period.
          </HelpWidget>
        </CardHeading>
        {_.isObject(apps) && (
          <PaginationPills
            onPageChange={(newPage) => setPage(newPage)}
            page={page}
            pageCount={apps.pageCount}
          />
        )}
      </CardHeader>
      <CardBody>
        {loading ? (
          <LoadingIndicator centered />
        ) : apps.items.length === 0 ? (
          <CardPlaceholder>
            No trading activity has been recorded for this token on known apps
            in the selected period.
          </CardPlaceholder>
        ) : (
          <TokenAppsTable apps={apps.items} token={token} />
        )}
      </CardBody>
    </Card>
  );
};

TokenAppsCard.propTypes = {
  className: PropTypes.string,
  limit: PropTypes.number,
  statsPeriod: PropTypes.string.isRequired,
  token: tokenPropTypes.tokenWithStats.isRequired,
};

TokenAppsCard.defaultProps = {
  className: undefined,
  limit: undefined,
};

export default TokenAppsCard;
/* eslint-enable no-nested-ternary */

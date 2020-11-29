/* eslint-disable no-nested-ternary */
import _ from 'lodash';
import PropTypes from 'prop-types';
import React from 'react';

import appsPropTypes from '../prop-types';
import Card from '../../../components/card';
import CardBody from '../../../components/card-body';
import CardHeader from '../../../components/card-header';
import CardHeading from '../../../components/card-heading';
import CardPlaceholder from '../../../components/card-placeholder';
import LoadingIndicator from '../../../components/loading-indicator';
import PaginationPills from '../../../components/pagination-pills';
import RelatedAppsTable from './related-apps-table';
import useRelatedApps from '../hooks/use-related-apps';
import CardFooter from '../../../components/card-footer';
import DropdownPill from '../../../components/dropdown-pill';

const RelatedAppsCard = ({ app, className, limit, statsPeriod }) => {
  const [sortBy, setSortBy] = React.useState('tradeVolume');
  const [page, setPage] = React.useState(1);
  const [relatedApps, loading] = useRelatedApps(app.urlSlug, {
    autoReload: true,
    limit,
    page,
    sortBy,
    statsPeriod,
  });

  return (
    <Card className={className}>
      <CardHeader>
        <CardHeading>Associated Apps</CardHeading>
        <DropdownPill
          onChange={setSortBy}
          options={[
            { label: 'By Trades', value: 'tradeCount' },
            { label: 'By Volume', value: 'tradeVolume' },
          ]}
          value={sortBy}
        />
      </CardHeader>
      <CardBody>
        {loading ? (
          <LoadingIndicator centered />
        ) : relatedApps.items.length === 0 ? (
          <CardPlaceholder>
            No related apps were detected for {app.name} in the selected period.
          </CardPlaceholder>
        ) : (
          <RelatedAppsTable app={app} relatedApps={relatedApps.items} />
        )}
      </CardBody>
      <CardFooter css="align-items: center; display: flex; justify-content: space-between;">
        {relatedApps.total > 0 && (
          <span>
            Showing {(page - 1) * limit + 1} to{' '}
            {_.clamp(page * limit, 0, relatedApps.total)} of {relatedApps.total}{' '}
            apps
          </span>
        )}
        {_.isObject(relatedApps) && (
          <PaginationPills
            onPageChange={(newPage) => setPage(newPage)}
            page={page}
            pageCount={relatedApps.pageCount}
          />
        )}
      </CardFooter>
    </Card>
  );
};

RelatedAppsCard.propTypes = {
  app: appsPropTypes.app.isRequired,
  className: PropTypes.string,
  limit: PropTypes.number,
  statsPeriod: PropTypes.string.isRequired,
};

RelatedAppsCard.defaultProps = {
  className: undefined,
  limit: undefined,
};

export default RelatedAppsCard;
/* eslint-enable no-nested-ternary */

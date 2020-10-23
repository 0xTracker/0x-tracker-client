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
import HelpWidget from '../../../components/help-widget';
import LoadingIndicator from '../../../components/loading-indicator';
import PaginationPills from '../../../components/pagination-pills';
import RelatedAppsTable from './related-apps-table';
import useRelatedApps from '../hooks/use-related-apps';

const RelatedAppsCard = ({ app, className, limit, statsPeriod }) => {
  const [page, setPage] = React.useState(1);
  const [relatedApps, loading] = useRelatedApps(app.urlSlug, {
    autoReload: true,
    limit,
    page,
    sortBy: 'tradeVolume',
    statsPeriod,
  });

  return (
    <Card className={className}>
      <CardHeader>
        <CardHeading>
          Related Apps{' '}
          <HelpWidget>
            Other apps which were involved with {app.name} trades in the
            selected period and the amount of volume they have in common.
          </HelpWidget>
        </CardHeading>
        {_.isObject(relatedApps) && (
          <PaginationPills
            onPageChange={(newPage) => setPage(newPage)}
            page={page}
            pageCount={relatedApps.pageCount}
          />
        )}
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

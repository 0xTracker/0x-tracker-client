import PropTypes from 'prop-types';
import React from 'react';

import { TIME_PERIOD, URL } from '../../../constants';
import { buildUrl } from '../../../util';
import { useMetadata } from '../../../hooks';
import Card from '../../../components/card';
import Hidden from '../../../components/hidden';
import LoadingIndicator from '../../../components/loading-indicator';
import PageLayout from '../../../components/page-layout';
import Paginator from '../../../components/paginator';
import RelayerList from './relayer-list';
import ResponsiveTimePeriodFilter from '../../../components/responsive-time-period-filter';
import SubTitle from '../../../components/sub-title';
import useRelayers from '../hooks/use-relayers';
import withPagination from '../../../components/with-pagination';

const defaultFilters = {
  statsPeriod: TIME_PERIOD.MONTH,
};

const periodDescriptions = {
  [TIME_PERIOD.DAY]: 'in the last 24 hours',
  [TIME_PERIOD.WEEK]: 'in the last week',
  [TIME_PERIOD.MONTH]: 'in the last month',
  [TIME_PERIOD.YEAR]: 'in the last year',
  [TIME_PERIOD.ALL]: 'from all time',
};

const RelayersPage = ({ history, location, page, setPage }) => {
  useMetadata({ title: '0x Protocol Relayer Metrics & Charts' });

  const params = new URLSearchParams(location.search);
  const statsPeriod = params.get('statsPeriod') || defaultFilters.statsPeriod;

  const [relayers, loadingRelayers] = useRelayers({
    autoReload: true,
    limit: 25,
    page,
    statsPeriod,
  });

  const { items, pageCount, pageSize, recordCount } = relayers;

  return (
    <PageLayout
      filter={
        <ResponsiveTimePeriodFilter
          name="statsPeriod"
          onChange={(newPeriod) => {
            history.push(buildUrl(URL.RELAYERS, { statsPeriod: newPeriod }));
          }}
          value={statsPeriod}
        />
      }
      title={
        <span>
          Active Relayers
          <Hidden above="xs">
            <SubTitle>{periodDescriptions[statsPeriod]}</SubTitle>
          </Hidden>
        </span>
      }
    >
      <Card fullHeight>
        {loadingRelayers ? (
          <LoadingIndicator centered />
        ) : (
          <>
            <RelayerList
              positionOffset={(page - 1) * pageSize}
              relayers={items}
              statsPeriod={statsPeriod}
            />
            <Paginator
              onPageChange={setPage}
              page={page}
              pageCount={pageCount}
              pageSize={pageSize}
              recordCount={recordCount}
            />
          </>
        )}
      </Card>
    </PageLayout>
  );
};

RelayersPage.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
  location: PropTypes.shape({
    search: PropTypes.string.isRequired,
  }).isRequired,
  page: PropTypes.number.isRequired,
  setPage: PropTypes.func.isRequired,
};

export default withPagination(RelayersPage);

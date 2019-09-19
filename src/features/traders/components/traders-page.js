import { Helmet } from 'react-helmet';
import PropTypes from 'prop-types';
import React from 'react';

import { TIME_PERIOD, URL } from '../../../constants';
import AsyncTimePeriodSelector from '../../../components/async-time-period-selector';
import Card from '../../../components/card';
import FilterButton from '../../../components/filter-button';
import LoadingIndicator from '../../../components/loading-indicator';
import PageLayout from '../../../components/page-layout';
import Paginator from '../../../components/paginator';
import TraderList from './trader-list';
import useTraders from '../hooks/use-traders';

const TradersPage = ({ history, location }) => {
  const params = new URLSearchParams(location.search);
  const statsPeriod = params.get('statsPeriod') || TIME_PERIOD.DAY;
  const page = params.get('page') || 1;

  const [traders, loading] = useTraders({
    autoReload: true,
    limit: 50,
    page,
    statsPeriod,
  });

  const [appliedFilters, setAppliedFilters] = React.useState(0);

  const { items, pageCount, pageSize, recordCount } = traders;

  return (
    <>
      <Helmet>
        <title>Makers & Takers</title>
      </Helmet>
      <PageLayout
        filter={
          <>
            <AsyncTimePeriodSelector
              defaultValue={statsPeriod}
              onChange={newPeriod => {
                history.push(
                  `${URL.TRADERS}?page=${page}&statsPeriod=${newPeriod}`,
                );
              }}
            />
            <FilterButton
              appliedFilterCount={appliedFilters}
              css="margin-left: 0.5rem; flex-shrink: 0; flex-basis: 38px;"
              onClick={() => setAppliedFilters(prev => prev + 1)}
              title="Show additional filters"
            />
          </>
        }
        title="Makers & Takers"
      >
        <Card fullHeight>
          {loading ? (
            <LoadingIndicator centered />
          ) : (
            <>
              <TraderList
                positionOffset={(page - 1) * pageSize}
                traders={items}
              />
              <Paginator
                onPageChange={newPage => {
                  history.push(
                    `${URL.TRADERS}?page=${newPage}&statsPeriod=${statsPeriod}`,
                  );
                }}
                page={page}
                pageCount={pageCount}
                pageSize={pageSize}
                recordCount={recordCount}
              />
            </>
          )}
        </Card>
      </PageLayout>
    </>
  );
};

TradersPage.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
  location: PropTypes.shape({
    search: PropTypes.string.isRequired,
  }).isRequired,
};

export default TradersPage;

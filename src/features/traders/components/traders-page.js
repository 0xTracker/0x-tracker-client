import { Helmet } from 'react-helmet';
import PropTypes from 'prop-types';
import React from 'react';

import { TIME_PERIOD, URL } from '../../../constants';
import buildUrl from '../../../util/build-url';
import Card from '../../../components/card';
import LoadingIndicator from '../../../components/loading-indicator';
import PageLayout from '../../../components/page-layout';
import Paginator from '../../../components/paginator';
import TraderList from './trader-list';
import TradersFilter from './traders-filter';
import useTraders from '../hooks/use-traders';

const TradersPage = ({ history, location }) => {
  const params = new URLSearchParams(location.search);
  const statsPeriod = params.get('statsPeriod') || TIME_PERIOD.DAY;
  const type = params.get('type');
  const page = params.get('page') || 1;

  const [traders, loading] = useTraders({
    autoReload: true,
    limit: 50,
    page,
    statsPeriod,
    type,
  });

  const { items, pageCount, pageSize, recordCount } = traders;

  return (
    <>
      <Helmet>
        <title>Makers & Takers</title>
      </Helmet>
      <PageLayout
        filter={
          <TradersFilter
            onChange={newValues => {
              history.push(buildUrl(URL.TRADERS, newValues));
            }}
            selectedFilters={{ statsPeriod, type }}
          />
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
                    buildUrl(URL.TRADERS, { page: newPage, statsPeriod, type }),
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

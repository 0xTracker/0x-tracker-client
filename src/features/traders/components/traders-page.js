import { Helmet } from 'react-helmet';
import PropTypes from 'prop-types';
import React from 'react';

import { TIME_PERIOD, URL } from '../../../constants';
import Card from '../../../components/card';
import LoadingIndicator from '../../../components/loading-indicator';
import PageLayout from '../../../components/page-layout';
import Paginator from '../../../components/paginator';
import TimePeriodSelector from '../../../components/time-period-selector';
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

  const { items, pageCount, pageSize, recordCount } = traders;

  return (
    <>
      <Helmet>
        <title>Makers & Takers</title>
      </Helmet>
      <PageLayout
        filter={
          <TimePeriodSelector
            css="width: 100%;"
            defaultValue={statsPeriod}
            onChange={newPeriod => {
              history.push(`${URL.TRADERS}?statsPeriod=${newPeriod}`);
            }}
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

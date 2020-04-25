import { Helmet } from 'react-helmet';
import PropTypes from 'prop-types';
import React from 'react';

import { TIME_PERIOD, URL } from '../../../constants';
import { media } from '../../../styles/util';
import ActiveTraderMetrics from '../../metrics/components/active-trader-metrics';
import buildUrl from '../../../util/build-url';
import Card from '../../../components/card';
import CardBody from '../../../components/card-body';
import Hidden from '../../../components/hidden';
import LoadingIndicator from '../../../components/loading-indicator';
import PageLayout from '../../../components/page-layout';
import Paginator from '../../../components/paginator';
import SubTitle from '../../../components/sub-title';
import TraderList from './trader-list';
import TradersFilter from './traders-filter';
import useTraders from '../hooks/use-traders';

const defaultFilters = {
  statsPeriod: TIME_PERIOD.MONTH,
  type: undefined,
};

const periodDescriptions = {
  [TIME_PERIOD.DAY]: 'in the last 24 hours',
  [TIME_PERIOD.WEEK]: 'in the last week',
  [TIME_PERIOD.MONTH]: 'in the last month',
  [TIME_PERIOD.YEAR]: 'in the last year',
  [TIME_PERIOD.ALL]: 'from all time',
};

const TradersPage = ({ history, location }) => {
  const params = new URLSearchParams(location.search);
  const statsPeriod = params.get('statsPeriod') || defaultFilters.statsPeriod;
  const type = params.get('type') || undefined;
  const page = params.get('page') || 1;

  const selectedFilters = {
    statsPeriod,
    type,
  };

  const [traders, loading] = useTraders({
    autoReload: true,
    limit: 25,
    page,
    ...selectedFilters,
  });

  const { items, pageCount, pageSize, recordCount } = traders;

  return (
    <>
      <Helmet>
        <title>Active Traders</title>
      </Helmet>
      <PageLayout
        filter={
          <TradersFilter
            defaultFilters={defaultFilters}
            onChange={(newFilters) => {
              history.push(buildUrl(URL.TRADERS, newFilters));
            }}
            selectedFilters={selectedFilters}
          />
        }
        title={
          <span>
            Active Traders
            <Hidden above="xs">
              <SubTitle>{periodDescriptions[statsPeriod]}</SubTitle>
            </Hidden>
          </span>
        }
      >
        <>
          <Card
            css={`
              height: 300px;
              margin-bottom: 1.25rem;

              ${media.greaterThan('lg')`
                margin-bottom: 2rem;
              `}
            `}
          >
            <CardBody padded>
              <ActiveTraderMetrics period={statsPeriod} />
            </CardBody>
          </Card>
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
                  onPageChange={(newPage) => {
                    history.push(
                      buildUrl(URL.TRADERS, {
                        page: newPage,
                        ...selectedFilters,
                      }),
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
        </>
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

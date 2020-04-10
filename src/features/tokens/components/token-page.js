import _ from 'lodash';
import { Helmet } from 'react-helmet';
import { useHistory, useParams } from 'react-router';
import { useSearchParam } from 'react-use';
import React from 'react';

import { TIME_PERIOD } from '../../../constants';
import buildTokenUrl from '../util/build-token-url';
import Card from '../../../components/card';
import Fills from '../../fills/components/fills';
import LoadingPage from '../../../components/loading-page';
import PageLayout from '../../../components/page-layout';
import ResponsiveTimePeriodFilter from '../../../components/responsive-time-period-filter';
import TabbedCard from '../../../components/tabbed-card';
import TokenMetrics from '../../metrics/components/token-metrics';
import TokenPageTitle from './token-page-title';
import TokenStats from './token-stats';
import useToken from '../hooks/use-token';

const TokenPage = () => {
  const history = useHistory();
  const params = useParams();

  const statsPeriod = useSearchParam('statsPeriod') || TIME_PERIOD.WEEK;
  const page = Number(useSearchParam('page')) || 1;
  const [token, loadingToken] = useToken(params.address, { statsPeriod });

  if (loadingToken) {
    return <LoadingPage />;
  }

  return (
    <>
      <Helmet>
        <title>
          {_.isString(token.name) ? token.name : `Token: ${token.address}`}
        </title>
      </Helmet>
      <PageLayout
        filter={
          <ResponsiveTimePeriodFilter
            onChange={(newPeriod) => {
              history.push(
                buildTokenUrl(token.address, { statsPeriod: newPeriod }),
              );
            }}
            value={statsPeriod}
          />
        }
        title={<TokenPageTitle statsPeriod={statsPeriod} token={token} />}
      >
        <TokenStats period={statsPeriod} token={token} />
        <TabbedCard
          css="height: 360px; margin-bottom: 2rem;"
          tabs={[
            {
              component: (
                <TokenMetrics
                  period={statsPeriod}
                  token={token}
                  type="price.close"
                />
              ),
              title: 'Market Price',
            },
            {
              component: <TokenMetrics period={statsPeriod} token={token} />,
              title: 'Volume',
            },
            {
              component: (
                <TokenMetrics
                  period={statsPeriod}
                  token={token}
                  type="tradeCount"
                />
              ),
              title: 'Trades',
            },
          ]}
        />
        <Card fullHeight>
          <Fills
            filter={{ token: token.address }}
            onPageChange={(newPage) => {
              history.push(
                buildTokenUrl(token.address, {
                  page: newPage,
                  statsPeriod,
                }),
              );
            }}
            page={page}
          />
        </Card>
      </PageLayout>
    </>
  );
};

export default TokenPage;

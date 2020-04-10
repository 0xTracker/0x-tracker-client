import _ from 'lodash';
import { Helmet } from 'react-helmet';
import PropTypes from 'prop-types';
import React from 'react';

import { TIME_PERIOD } from '../../../constants';
import { useCurrentBreakpoint } from '../../../responsive-utils';
import buildTokenUrl from '../util/build-token-url';
import Card from '../../../components/card';
import Fills from '../../fills/components/fills';
import LoadingPage from '../../../components/loading-page';
import MobileTimePeriodFilter from '../../../components/mobile-time-period-filter';
import PageLayout from '../../../components/page-layout';
import TabbedCard from '../../../components/tabbed-card';
import TimePeriodFilter from '../../../components/time-period-filter';
import TokenMetrics from '../../metrics/components/token-metrics';
import TokenPageTitle from './token-page-title';
import TokenStats from './token-stats';
import useToken from '../hooks/use-token';

const TokenPage = ({ history, location, match }) => {
  const params = new URLSearchParams(location.search);
  const statsPeriod = params.get('statsPeriod') || TIME_PERIOD.WEEK;
  const breakpoint = useCurrentBreakpoint();
  const { address: tokenAddress } = match.params;
  const page = Number(params.get('page')) || 1;
  const [token, loadingToken] = useToken(tokenAddress, { statsPeriod });

  if (loadingToken) {
    return <LoadingPage />;
  }

  const periodFilterProps = {
    onChange: (newPeriod) => {
      history.push(buildTokenUrl(token.address, { statsPeriod: newPeriod }));
    },
    value: statsPeriod,
  };

  const onPageChange = (newPage) => {
    history.push(
      buildTokenUrl(token.address, {
        page: newPage,
        statsPeriod,
      }),
    );
  };

  return (
    <>
      <Helmet>
        <title>
          {_.has(token, 'name') ? token.name : `Token: ${token.address}`}
        </title>
      </Helmet>
      <PageLayout
        filter={
          breakpoint.lessThan('sm') ? (
            <MobileTimePeriodFilter {...periodFilterProps} />
          ) : (
            <TimePeriodFilter {...periodFilterProps} />
          )
        }
        title={<TokenPageTitle token={token} />}
      >
        <TokenStats
          css="margin-bottom: 2rem;"
          period={statsPeriod}
          token={token}
        />
        {token ? (
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
        ) : null}
        <Card fullHeight>
          <Fills
            filter={{ token: tokenAddress }}
            onPageChange={onPageChange}
            page={page}
          />
        </Card>
      </PageLayout>
    </>
  );
};

TokenPage.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
  location: PropTypes.shape({
    search: PropTypes.string.isRequired,
  }).isRequired,
  match: PropTypes.shape({
    params: PropTypes.shape({
      address: PropTypes.string.isRequired,
    }).isRequired,
    url: PropTypes.string.isRequired,
  }).isRequired,
};

export default TokenPage;

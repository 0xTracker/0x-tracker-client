import _ from 'lodash';
import { useParams } from 'react-router';
import React from 'react';

import { TIME_PERIOD } from '../../../constants';
import { TOKEN_TYPE } from '../constants';
import { useCurrentBreakpoint } from '../../../responsive-utils';
import { useMetadata, useNavigator, useSearchParam } from '../../../hooks';
import buildTokenUrl from '../util/build-token-url';
import CardGrid from '../../../components/card-grid';
import CardGridCol from '../../../components/card-grid-col';
import CardGridRow from '../../../components/card-grid-row';
import LoadingPage from '../../../components/loading-page';
import PageLayout from '../../../components/page-layout';
import RecentFillsCard from '../../fills/components/recent-fills-card';
import ResponsiveTimePeriodFilter from '../../../components/responsive-time-period-filter';
import TabbedCard from '../../../components/tabbed-card';
import TokenMetrics from '../../metrics/components/token-metrics';
import TokenPageTitle from './token-page-title';
import TokenRelayersCard from './token-relayers-card';
import TokenStats from './token-stats';
import useToken from '../hooks/use-token';

const generateTitle = (token) => {
  if (token === undefined) {
    return '0x Tracker';
  }

  const name = _.isString(token.name) ? token.name : token.address;
  const descriptor = _.isString(token.symbol)
    ? `${name} (${token.symbol.toUpperCase()})`
    : name;

  return `${descriptor} Price, Metrics & Charts`;
};

const TokenPage = () => {
  const { address } = useParams();
  const { navigateTo } = useNavigator();
  const breakpoint = useCurrentBreakpoint();
  const statsPeriod = useSearchParam('statsPeriod', TIME_PERIOD.MONTH);
  const [token, loadingToken] = useToken(address, { statsPeriod });

  useMetadata({ title: generateTitle(token) });

  if (loadingToken) {
    return <LoadingPage />;
  }

  return (
    <PageLayout
      filter={
        <ResponsiveTimePeriodFilter
          onChange={(newPeriod) => {
            navigateTo(buildTokenUrl(token.address), {
              statsPeriod: newPeriod,
            });
          }}
          value={statsPeriod}
        />
      }
      title={<TokenPageTitle statsPeriod={statsPeriod} token={token} />}
    >
      <CardGrid>
        <TokenStats period={statsPeriod} token={token} />
        <CardGridRow>
          <CardGridCol>
            <TabbedCard
              tabs={[
                token.type === TOKEN_TYPE.ERC20
                  ? {
                      component: (
                        <TokenMetrics
                          period={statsPeriod}
                          token={token}
                          type="price.close"
                        />
                      ),
                      title: breakpoint.greaterThan('xs')
                        ? 'Market Price'
                        : 'Price',
                    }
                  : undefined,
                {
                  component: (
                    <TokenMetrics period={statsPeriod} token={token} />
                  ),
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
              ].filter((tab) => tab !== undefined)}
            />
          </CardGridCol>
        </CardGridRow>
        <CardGridRow>
          <CardGridCol lg={7}>
            <RecentFillsCard
              filter={{ token: token.address }}
              limit={breakpoint.greaterThan('xs') ? 7 : 5}
              placeholder="No recent fills are available for this token."
            />
          </CardGridCol>
          <CardGridCol lg={5}>
            <TokenRelayersCard
              limit={breakpoint.greaterThan('xs') ? 7 : 5}
              statsPeriod={statsPeriod}
              token={token}
            />
          </CardGridCol>
        </CardGridRow>
      </CardGrid>
    </PageLayout>
  );
};

export default TokenPage;

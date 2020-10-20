import { useParams } from 'react-router';
import React from 'react';

import { TIME_PERIOD } from '../../../constants';
import { useMetadata, useNavigator, useSearchParam } from '../../../hooks';
import { getPeriodDescriptor } from '../../../util';
import AppLogo from './app-logo';
import buildAppUrl from '../util/build-app-url';
import CardGrid from '../../../components/card-grid';
import CardGridCol from '../../../components/card-grid-col';
import CardGridRow from '../../../components/card-grid-row';
import LoadingPage from '../../../components/loading-page';
import PageLayout from '../../../components/page-layout';
import PageNotFound from '../../../components/page-not-found';
import RelayerMetrics from '../../metrics/components/relayer-metrics';
import ResponsiveTimePeriodFilter from '../../../components/responsive-time-period-filter';
import TabbedCard from '../../../components/tabbed-card';
import useRelayer from '../hooks/use-relayer';
import RecentFillsCard from '../../fills/components/recent-fills-card';
import RelayerTokensCard from './relayer-tokens-card';
import RelayerStats from './relayer-stats';

const getName = (relayer) => {
  if (relayer === undefined) {
    return undefined;
  }

  if (relayer.id === 'unknown') {
    return 'Unknown App';
  }

  return relayer.name;
};

const AppPage = () => {
  const { slug } = useParams();
  const { navigateTo } = useNavigator();
  const statsPeriod = useSearchParam('statsPeriod', TIME_PERIOD.MONTH);
  const [relayer, loadingRelayer] = useRelayer(slug, { statsPeriod });

  useMetadata({
    title:
      relayer === undefined
        ? undefined
        : `${getName(relayer)} Trading Activity, Metrics & Charts`,
  });

  if (loadingRelayer) {
    return <LoadingPage />;
  }

  if (relayer === undefined) {
    return <PageNotFound />;
  }

  return (
    <PageLayout
      actions={
        <ResponsiveTimePeriodFilter
          onChange={(newPeriod) => {
            navigateTo(buildAppUrl(relayer.slug), {
              statsPeriod: newPeriod,
            });
          }}
          value={statsPeriod}
        />
      }
      icon={<AppLogo height={35} imageUrl={relayer.imageUrl} width={35} />}
      subTitle={getPeriodDescriptor(statsPeriod)}
      title={getName(relayer)}
    >
      <CardGrid>
        <RelayerStats period={statsPeriod} relayer={relayer} />
        <CardGridRow>
          <CardGridCol xs={12}>
            <TabbedCard
              tabs={[
                {
                  component: (
                    <RelayerMetrics
                      period={statsPeriod}
                      relayerId={relayer.id}
                      type="tradeVolume"
                    />
                  ),
                  title: 'Volume',
                },
                {
                  component: (
                    <RelayerMetrics
                      period={statsPeriod}
                      relayerId={relayer.id}
                      type="tradeCount"
                    />
                  ),
                  title: 'Trades',
                },
                {
                  component: (
                    <RelayerMetrics
                      period={statsPeriod}
                      relayerId={relayer.id}
                      type="traderCount"
                    />
                  ),
                  title: 'Active Traders',
                },
              ]}
            />
          </CardGridCol>
        </CardGridRow>
        <CardGridRow>
          <CardGridCol lg={7}>
            <RecentFillsCard
              filter={{ relayer: relayer.id }}
              limit={6}
              showRelayer={false}
            />
          </CardGridCol>
          <CardGridCol lg={5}>
            <RelayerTokensCard
              limit={6}
              relayerSlug={relayer.slug}
              statsPeriod={statsPeriod}
            />
          </CardGridCol>
        </CardGridRow>
      </CardGrid>
    </PageLayout>
  );
};

export default AppPage;

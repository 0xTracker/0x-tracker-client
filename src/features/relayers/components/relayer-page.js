import _ from 'lodash';
import { useParams } from 'react-router';
import React from 'react';

import { TIME_PERIOD } from '../../../constants';
import { useMetadata, useNavigator, useSearchParam } from '../../../hooks';
import { getPeriodDescriptor } from '../../../util';
import buildRelayerUrl from '../util/build-relayer-url';
import CardGrid from '../../../components/card-grid';
import CardGridCol from '../../../components/card-grid-col';
import CardGridRow from '../../../components/card-grid-row';
import LoadingPage from '../../../components/loading-page';
import PageLayout from '../../../components/page-layout';
import PageNotFound from '../../../components/page-not-found';
import RelayerImage from './relayer-image';
import RelayerMetrics from '../../metrics/components/relayer-metrics';
import ResponsiveTimePeriodFilter from '../../../components/responsive-time-period-filter';
import TabbedCard from '../../../components/tabbed-card';
import useRelayer from '../hooks/use-relayer';
import RecentFillsCard from '../../fills/components/recent-fills-card';
import RelayerTokensCard from './relayer-tokens-card';

const RelayerPage = () => {
  const { slug } = useParams();
  const { navigateTo } = useNavigator();
  const statsPeriod = useSearchParam('statsPeriod', TIME_PERIOD.MONTH);
  const [relayer, loadingRelayer] = useRelayer(slug, { statsPeriod });

  useMetadata({
    title:
      relayer === undefined
        ? undefined
        : `${relayer.name} Trading Activity, Metrics & Charts`,
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
            navigateTo(buildRelayerUrl(relayer.slug), {
              statsPeriod: newPeriod,
            });
          }}
          value={statsPeriod}
        />
      }
      icon={
        _.has(relayer, 'imageUrl') ? (
          <RelayerImage height={35} imageUrl={relayer.imageUrl} width={35} />
        ) : null
      }
      subTitle={getPeriodDescriptor(statsPeriod)}
      title={relayer.name}
    >
      <CardGrid>
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
            <RecentFillsCard filter={{ relayer: relayer.id }} limit={6} />
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

export default RelayerPage;

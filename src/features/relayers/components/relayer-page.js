import { useParams } from 'react-router';
import React from 'react';

import { TIME_PERIOD } from '../../../constants';
import { useMetadata, usePaginator } from '../../../hooks';
import Card from '../../../components/card';
import CardBody from '../../../components/card-body';
import CardGrid from '../../../components/card-grid';
import CardGridCol from '../../../components/card-grid-col';
import CardGridRow from '../../../components/card-grid-row';
import ChartsContainer from '../../../components/charts-container';
import Fills from '../../fills/components/fills';
import getPeriodOptions from '../../../util/get-period-options';
import LoadingPage from '../../../components/loading-page';
import PageLayout from '../../../components/page-layout';
import PageNotFound from '../../../components/page-not-found';
import RelayerMetrics from '../../metrics/components/relayer-metrics';
import RelayerPageTitle from './relayer-page-title';
import useRelayer from '../hooks/use-relayer';

const RelayerPage = () => {
  const { slug } = useParams();
  const { page, setPage } = usePaginator();
  const [relayer, loadingRelayer] = useRelayer(slug);

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
    <PageLayout title={<RelayerPageTitle relayer={relayer} />}>
      <CardGrid>
        <CardGridRow>
          <CardGridCol xs={12}>
            <ChartsContainer
              charts={[
                {
                  component: (
                    <RelayerMetrics relayerId={relayer.id} type="tradeVolume" />
                  ),
                  title: 'Volume',
                },
                {
                  component: (
                    <RelayerMetrics relayerId={relayer.id} type="tradeCount" />
                  ),
                  title: 'Trades',
                },
                {
                  component: (
                    <RelayerMetrics relayerId={relayer.id} type="traderCount" />
                  ),
                  title: 'Active Traders',
                },
              ]}
              defaultPeriod={TIME_PERIOD.MONTH}
              periods={getPeriodOptions([
                TIME_PERIOD.DAY,
                TIME_PERIOD.WEEK,
                TIME_PERIOD.MONTH,
                TIME_PERIOD.YEAR,
                TIME_PERIOD.ALL,
              ])}
            />
          </CardGridCol>
        </CardGridRow>
        <CardGridRow>
          <CardGridCol>
            <Card>
              <CardBody>
                <Fills
                  excludeColumns={['relayer']}
                  filter={{ relayer: relayer.id }}
                  onPageChange={setPage}
                  page={page}
                />
              </CardBody>
            </Card>
          </CardGridCol>
        </CardGridRow>
      </CardGrid>
    </PageLayout>
  );
};

export default RelayerPage;

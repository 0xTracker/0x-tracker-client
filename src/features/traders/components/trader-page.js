import { useLocation, useParams } from 'react-router';
import React from 'react';

import { TIME_PERIOD } from '../../../constants';
import { useMetadata, useNavigator, usePageParam } from '../../../hooks';
import AddressMetrics from '../../metrics/components/address-metrics';
import Blockie from '../../../components/blockie';
import Card from '../../../components/card';
import CardBody from '../../../components/card-body';
import CardGrid from '../../../components/card-grid';
import CardGridCol from '../../../components/card-grid-col';
import CardGridRow from '../../../components/card-grid-row';
import ChartsContainer from '../../../components/charts-container';
import Fills from '../../fills/components/fills';
import PageLayout from '../../../components/page-layout';

const TraderPage = () => {
  const { navigateTo } = useNavigator();
  const { address } = useParams();
  const { pathname } = useLocation();
  const page = usePageParam();

  useMetadata({ title: `0x Trading Activity for ${address}` });

  return (
    <PageLayout
      title={
        <div css="display: flex; align-items: center;">
          <Blockie
            css="border-radius: 0.25rem; margin-right: 0.75rem;"
            seed={address}
            size="30px"
          />
          Trader: {address}
        </div>
      }
    >
      <CardGrid>
        <CardGridRow>
          <CardGridCol>
            <ChartsContainer
              charts={[
                {
                  component: <AddressMetrics address={address} />,
                  title: 'Volume',
                },
                {
                  component: (
                    <AddressMetrics address={address} keyMetric="tradeCount" />
                  ),
                  title: 'Trades',
                },
              ]}
              defaultPeriod={TIME_PERIOD.MONTH}
              periods={[
                { label: '24H', value: TIME_PERIOD.DAY },
                { label: '7D', value: TIME_PERIOD.WEEK },
                { label: '1M', value: TIME_PERIOD.MONTH },
                { label: '1Y', value: TIME_PERIOD.YEAR },
                { label: 'ALL', value: TIME_PERIOD.ALL },
              ]}
            />
          </CardGridCol>
        </CardGridRow>
        <CardGridRow>
          <CardGridCol>
            <Card>
              <CardBody>
                <Fills
                  filter={{ address }}
                  onPageChange={(newPage) => {
                    navigateTo(pathname, {
                      page: newPage,
                    });
                  }}
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

export default TraderPage;

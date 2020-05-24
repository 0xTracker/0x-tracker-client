import React from 'react';

import { TIME_PERIOD, URL } from '../../../constants';
import { useMetadata, useNavigator, useSearchParam } from '../../../hooks';
import ActiveTraderMetrics from '../../metrics/components/active-trader-metrics';
import Card from '../../../components/card';
import CardBody from '../../../components/card-body';
import CardGrid from '../../../components/card-grid';
import CardGridCol from '../../../components/card-grid-col';
import CardGridRow from '../../../components/card-grid-row';
import CardHeader from '../../../components/card-header';
import CardHeading from '../../../components/card-heading';
import PageLayout from '../../../components/page-layout';
import SubTitle from '../../../components/sub-title';
import TraderBreakdown from './trader-breakdown';
import TradersFilter from './traders-filter';
import Traders from './traders';

const defaultPeriod = TIME_PERIOD.MONTH;

const periodDescriptions = {
  [TIME_PERIOD.DAY]: 'from the past 24 hours',
  [TIME_PERIOD.WEEK]: 'from the past week',
  [TIME_PERIOD.MONTH]: 'from the past 30 days',
  [TIME_PERIOD.YEAR]: 'from the past year',
  [TIME_PERIOD.ALL]: 'from all time',
};

const DESCRIPTOR_MAPPINGS = {
  maker: 'Makers',
  taker: 'Takers',
  undefined: 'Traders',
};

const METRIC_TYPE_MAPPINGS = {
  maker: 'makerCount',
  taker: 'takerCount',
  undefined: 'traderCount',
};

const TradersPage = () => {
  useMetadata({ title: '0x Protocol Trader Metrics & Charts' });

  const { navigateTo } = useNavigator();
  const statsPeriod = useSearchParam('statsPeriod', defaultPeriod);
  const type = useSearchParam('type');
  const page = useSearchParam('page', 1);

  const selectedFilters = {
    statsPeriod,
    type,
  };

  return (
    <PageLayout
      filter={
        <TradersFilter
          defaultFilters={{ statsPeriod: defaultPeriod, type: undefined }}
          onChange={(newFilters) => {
            if (window.fathom) {
              window.fathom.trackGoal('YWA7WQ82', 0);
            }

            navigateTo(URL.TRADERS, newFilters);
          }}
          selectedFilters={selectedFilters}
        />
      }
      title={
        <>
          Active {DESCRIPTOR_MAPPINGS[type]}
          <SubTitle>{periodDescriptions[statsPeriod]}</SubTitle>
        </>
      }
    >
      <CardGrid>
        <CardGridRow minHeight="330px">
          <CardGridCol lg={7}>
            <Card>
              <CardHeader>
                <CardHeading
                  tooltip={`Number of active ${DESCRIPTOR_MAPPINGS[
                    type
                  ].toLowerCase()} over time in the selected period.`}
                >
                  Trend
                </CardHeading>
              </CardHeader>
              <CardBody padded>
                <ActiveTraderMetrics
                  period={statsPeriod}
                  type={METRIC_TYPE_MAPPINGS[type]}
                />
              </CardBody>
            </Card>
          </CardGridCol>
          <CardGridCol lg={5}>
            <Card>
              <CardHeader>
                <CardHeading tooltip="Comparison between the number of active makers and takers in the selected period.">
                  Maker-Taker Split
                </CardHeading>
              </CardHeader>
              <CardBody css="padding: 3rem;">
                <TraderBreakdown period={statsPeriod} />
              </CardBody>
            </Card>
          </CardGridCol>
        </CardGridRow>
        <CardGridRow>
          <CardGridCol xs={12}>
            <Card errorMessage="An error occurred while loading traders">
              <CardBody>
                <Traders
                  onPageChange={(newPage) => {
                    navigateTo(URL.TRADERS, {
                      page: newPage,
                      ...selectedFilters,
                    });
                  }}
                  page={page}
                  statsPeriod={statsPeriod}
                  type={type}
                />
              </CardBody>
            </Card>
          </CardGridCol>
        </CardGridRow>
      </CardGrid>
    </PageLayout>
  );
};

export default TradersPage;

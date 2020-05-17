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
import LoadingIndicator from '../../../components/loading-indicator';
import PageLayout from '../../../components/page-layout';
import Paginator from '../../../components/paginator';
import SubTitle from '../../../components/sub-title';
import TraderBreakdown from './trader-breakdown';
import TraderList from './trader-list';
import TradersFilter from './traders-filter';
import useTraders from '../hooks/use-traders';

const defaultPeriod = TIME_PERIOD.MONTH;

const periodDescriptions = {
  [TIME_PERIOD.DAY]: 'in the last 24 hours',
  [TIME_PERIOD.WEEK]: 'in the last week',
  [TIME_PERIOD.MONTH]: 'in the last month',
  [TIME_PERIOD.YEAR]: 'in the last year',
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

const SORT_BY_MAPPINGS = {
  maker: 'fillVolume.maker',
  taker: 'fillVolume.taker',
  undefined: 'fillVolume.total',
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

  const [traders, loading] = useTraders({
    autoReload: true,
    limit: 25,
    page,
    sortBy: SORT_BY_MAPPINGS[type],
    statsPeriod,
    type,
  });

  const { items, pageCount, pageSize, recordCount } = traders;

  return (
    <PageLayout
      filter={
        <TradersFilter
          defaultFilters={{ statsPeriod: defaultPeriod, type: undefined }}
          onChange={(newFilters) => {
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
        <CardGridRow>
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
            <Card>
              <CardBody>
                {loading ? (
                  <LoadingIndicator centered />
                ) : (
                  <>
                    <TraderList
                      positionOffset={(page - 1) * pageSize}
                      statsPeriod={statsPeriod}
                      statsType={type}
                      traders={items}
                    />
                    <Paginator
                      onPageChange={(newPage) => {
                        navigateTo(URL.TRADERS, {
                          page: newPage,
                          ...selectedFilters,
                        });
                      }}
                      page={page}
                      pageCount={pageCount}
                      pageSize={pageSize}
                      recordCount={recordCount}
                    />
                  </>
                )}
              </CardBody>
            </Card>
          </CardGridCol>
        </CardGridRow>
      </CardGrid>
    </PageLayout>
  );
};

export default TradersPage;

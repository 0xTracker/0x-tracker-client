import _ from 'lodash';
import React from 'react';

import { URL } from '../../../constants';
import {
  useMetadata,
  useNavigator,
  usePaginator,
  useSearchParam,
} from '../../../hooks';
import Card from '../../../components/card';
import CardGrid from '../../../components/card-grid';
import CardGridCol from '../../../components/card-grid-col';
import CardGridRow from '../../../components/card-grid-row';
import Fills from './fills';
import FillsBrowserStats from './fills-browser-stats';
import FillsFilter from './fills-filter';
import NetworkMetrics from '../../metrics/components/network-metrics';
import PageLayout from '../../../components/page-layout';
import SubTitle from '../../../components/sub-title';
import TabbedCard from '../../../components/tabbed-card';
import { FillsIcon } from '../../../components/icons';

const formatDate = (date) => {
  const parsedDate = new Date(date);
  const year = parsedDate.getUTCFullYear();
  const month = _.padStart(parsedDate.getUTCMonth() + 1, 2, 0);
  const day = _.padStart(parsedDate.getUTCDate(), 2, 0);

  return `${day}/${month}/${year}`;
};

const getSubTitle = (dateFrom, dateTo) => {
  if (dateFrom !== undefined && dateTo !== undefined) {
    return `from ${formatDate(dateFrom)} to ${formatDate(dateTo)}`;
  }

  if (dateFrom !== undefined) {
    return `from ${formatDate(dateFrom)} to now`;
  }

  if (dateTo !== undefined) {
    return `from 0x launch to ${formatDate(dateTo)}`;
  }

  return 'from all time';
};

const FillsPage = () => {
  useMetadata({ title: 'Browse 0x Protocol Fills' });

  const { navigateTo } = useNavigator();
  const { page, setPage } = usePaginator();

  const status = useSearchParam('status');
  const dateFrom = useSearchParam('dateFrom');
  const dateTo = useSearchParam('dateTo');
  const protocolVersion = useSearchParam('protocolVersion');
  const token = useSearchParam('token');
  const relayer = useSearchParam('relayer');
  const valueFrom = useSearchParam('valueFrom');
  const valueTo = useSearchParam('valueTo');

  const period =
    dateFrom === undefined && dateTo === undefined ? 'all' : undefined;

  const metricsPeriod =
    dateFrom === undefined && dateTo === undefined
      ? 'all'
      : { from: dateFrom, to: dateTo };

  return (
    <PageLayout
      filter={
        <FillsFilter
          defaultFilters={{
            dateFrom: undefined,
            dateTo: undefined,
            protocolVersion: undefined,
            relayer: undefined,
            status: undefined,
            token: undefined,
            valueFrom: undefined,
            valueTo: undefined,
          }}
          onChange={(newFilters) => {
            navigateTo(URL.FILLS, newFilters);
          }}
          selectedFilters={{
            dateFrom,
            dateTo,
            protocolVersion:
              protocolVersion === undefined
                ? undefined
                : _.toNumber(protocolVersion),
            relayer,
            status,
            token,
            valueFrom,
            valueTo,
          }}
        />
      }
      title={
        <div css="align-items: center; display: flex;">
          <FillsIcon css="margin-right: 12px;" size={44} />
          <div>
            Browse Fills<SubTitle>{getSubTitle(dateFrom, dateTo)}</SubTitle>
          </div>
        </div>
      }
    >
      <CardGrid>
        <FillsBrowserStats
          filters={{
            periodFrom: dateFrom,
            periodTo: dateTo,
            protocolVersion,
            relayer,
            status,
            token,
            valueFrom,
            valueTo,
          }}
          period={period}
        />
        <CardGridRow>
          <CardGridCol>
            <TabbedCard
              tabs={[
                {
                  component: (
                    <NetworkMetrics
                      filters={{
                        periodFrom: dateFrom,
                        periodTo: dateTo,
                        protocolVersion,
                        relayer,
                        status,
                        token,
                        valueFrom,
                        valueTo,
                      }}
                      period={metricsPeriod}
                      type="tradeVolume"
                    />
                  ),
                  title: 'Volume',
                },
                {
                  component: (
                    <NetworkMetrics
                      filters={{
                        periodFrom: dateFrom,
                        periodTo: dateTo,
                        protocolVersion,
                        relayer,
                        status,
                        token,
                        valueFrom,
                        valueTo,
                      }}
                      period={metricsPeriod}
                      type="tradeCount"
                    />
                  ),
                  title: 'Trades',
                },
              ]}
            />
          </CardGridCol>
        </CardGridRow>
        <CardGridRow>
          <CardGridCol>
            <Card>
              <Fills
                filter={{
                  dateFrom,
                  dateTo,
                  protocolVersion,
                  relayer,
                  status,
                  token,
                  valueFrom,
                  valueTo,
                }}
                onPageChange={setPage}
                page={page}
              />
            </Card>
          </CardGridCol>
        </CardGridRow>
      </CardGrid>
    </PageLayout>
  );
};

export default FillsPage;

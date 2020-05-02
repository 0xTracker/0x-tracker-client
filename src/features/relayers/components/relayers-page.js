import React from 'react';

import { TIME_PERIOD, URL } from '../../../constants';
import {
  useMetadata,
  useNavigator,
  usePaginator,
  useSearchParam,
} from '../../../hooks';
import Card from '../../../components/card';
import Hidden from '../../../components/hidden';
import LoadingIndicator from '../../../components/loading-indicator';
import PageLayout from '../../../components/page-layout';
import Paginator from '../../../components/paginator';
import RelayerList from './relayer-list';
import ResponsiveTimePeriodFilter from '../../../components/responsive-time-period-filter';
import SubTitle from '../../../components/sub-title';
import useRelayers from '../hooks/use-relayers';

const periodDescriptions = {
  [TIME_PERIOD.DAY]: 'in the last 24 hours',
  [TIME_PERIOD.WEEK]: 'in the last week',
  [TIME_PERIOD.MONTH]: 'in the last month',
  [TIME_PERIOD.YEAR]: 'in the last year',
  [TIME_PERIOD.ALL]: 'from all time',
};

const RelayersPage = () => {
  useMetadata({ title: '0x Protocol Relayer Metrics & Charts' });

  const { navigateTo } = useNavigator();
  const { page, setPage } = usePaginator();
  const statsPeriod = useSearchParam('statsPeriod', TIME_PERIOD.MONTH);
  const [relayers, loadingRelayers] = useRelayers({
    autoReload: true,
    limit: 25,
    page,
    statsPeriod,
  });
  const { items, pageCount, pageSize, recordCount } = relayers;

  return (
    <PageLayout
      filter={
        <ResponsiveTimePeriodFilter
          name="statsPeriod"
          onChange={(newPeriod) => {
            navigateTo(URL.RELAYERS, { statsPeriod: newPeriod });
          }}
          value={statsPeriod}
        />
      }
      title={
        <>
          Active Relayers
          <Hidden above="xs">
            <SubTitle>{periodDescriptions[statsPeriod]}</SubTitle>
          </Hidden>
        </>
      }
    >
      <Card>
        {loadingRelayers ? (
          <LoadingIndicator centered />
        ) : (
          <>
            <RelayerList
              positionOffset={(page - 1) * pageSize}
              relayers={items}
              statsPeriod={statsPeriod}
            />
            <Paginator
              onPageChange={setPage}
              page={page}
              pageCount={pageCount}
              pageSize={pageSize}
              recordCount={recordCount}
            />
          </>
        )}
      </Card>
    </PageLayout>
  );
};

export default RelayersPage;

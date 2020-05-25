import React from 'react';

import { TIME_PERIOD, URL } from '../../../constants';
import {
  useMetadata,
  useNavigator,
  usePaginator,
  useSearchParam,
} from '../../../hooks';
import { RelayersIcon } from '../../../components/icons';
import Card from '../../../components/card';
import PageLayout from '../../../components/page-layout';
import Relayers from './relayers';
import ResponsiveTimePeriodFilter from '../../../components/responsive-time-period-filter';

const periodDescriptions = {
  [TIME_PERIOD.DAY]: 'from the past 24 hours',
  [TIME_PERIOD.WEEK]: 'from the past week',
  [TIME_PERIOD.MONTH]: 'from the past 30 days',
  [TIME_PERIOD.YEAR]: 'from the past year',
  [TIME_PERIOD.ALL]: 'from all time',
};

const RelayersPage = () => {
  useMetadata({ title: '0x Protocol Relayer Metrics & Charts' });

  const { navigateTo } = useNavigator();
  const { page, setPage } = usePaginator();
  const statsPeriod = useSearchParam('statsPeriod', TIME_PERIOD.MONTH);

  return (
    <PageLayout
      actions={
        <ResponsiveTimePeriodFilter
          name="statsPeriod"
          onChange={(newPeriod) => {
            navigateTo(URL.RELAYERS, { statsPeriod: newPeriod });
          }}
          value={statsPeriod}
        />
      }
      icon={<RelayersIcon size={32} />}
      subTitle={periodDescriptions[statsPeriod]}
      title="Active Relayers"
    >
      <Card errorMessage="An error occurred while loading relayers">
        <Relayers
          onPageChange={setPage}
          page={page}
          statsPeriod={statsPeriod}
        />
      </Card>
    </PageLayout>
  );
};

export default RelayersPage;

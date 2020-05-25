import React from 'react';

import { TIME_PERIOD, URL } from '../../../constants';
import {
  useMetadata,
  useNavigator,
  usePaginator,
  useSearchParam,
} from '../../../hooks';
import { RelayersIcon } from '../../../components/icons';
import { getPeriodDescriptor } from '../../../util';
import Card from '../../../components/card';
import PageLayout from '../../../components/page-layout';
import Relayers from './relayers';
import ResponsiveTimePeriodFilter from '../../../components/responsive-time-period-filter';

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
      subTitle={getPeriodDescriptor(statsPeriod)}
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

import React from 'react';

import { TIME_PERIOD, URL } from '../../../constants';
import {
  useMetadata,
  useNavigator,
  usePaginator,
  useSearchParam,
} from '../../../hooks';
import { AppsIcon } from '../../../components/icons';
import { getPeriodDescriptor } from '../../../util';
import Apps from './apps';
import PageLayout from '../../../components/page-layout';
import ResponsiveTimePeriodFilter from '../../../components/responsive-time-period-filter';

const AppsPage = () => {
  useMetadata({ title: 'Explore 0x Apps' });

  const { navigateTo } = useNavigator();
  const { page, setPage } = usePaginator();
  const statsPeriod = useSearchParam('statsPeriod', TIME_PERIOD.MONTH);

  return (
    <PageLayout
      actions={
        <ResponsiveTimePeriodFilter
          name="statsPeriod"
          onChange={(newPeriod) => {
            navigateTo(URL.APPS, { statsPeriod: newPeriod });
          }}
          value={statsPeriod}
        />
      }
      icon={<AppsIcon size={44} />}
      subTitle={getPeriodDescriptor(statsPeriod)}
      title="Explore Active Apps"
    >
      <Apps onPageChange={setPage} page={page} statsPeriod={statsPeriod} />
    </PageLayout>
  );
};

export default AppsPage;

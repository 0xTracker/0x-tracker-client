import React from 'react';

import { TIME_PERIOD, URL } from '../../../constants';
import {
  useMetadata,
  useNavigator,
  usePaginator,
  useSearchParam,
} from '../../../hooks';
import { AppsIcon } from '../../../components/icons';
import Apps from './apps';
import PageLayout from '../../../components/page-layout';
import AppsFilter from './apps-filter';

const getPeriodDescriptor = (period) =>
  ({
    [TIME_PERIOD.DAY]: 'active in the last 24 hours',
    [TIME_PERIOD.WEEK]: 'active in the past week',
    [TIME_PERIOD.MONTH]: 'active in the past 30 days',
    [TIME_PERIOD.YEAR]: 'active in the past year',
    [TIME_PERIOD.ALL]: 'active since 0x launch',
  }[period]);

const AppsPage = () => {
  useMetadata({ title: 'Explore 0x Apps' });

  const { navigateTo } = useNavigator();
  const { page, setPage } = usePaginator();
  const statsPeriod = useSearchParam('statsPeriod', TIME_PERIOD.MONTH);
  const category = useSearchParam('category');

  const selectedFilters = {
    category,
    statsPeriod,
  };

  return (
    <PageLayout
      actions={
        <AppsFilter
          defaultFilters={{
            category: undefined,
            statsPeriod: TIME_PERIOD.MONTH,
          }}
          onChange={(newFilters) => {
            navigateTo(URL.APPS, newFilters);
          }}
          selectedFilters={selectedFilters}
        />
      }
      icon={<AppsIcon size={44} />}
      subTitle={getPeriodDescriptor(statsPeriod)}
      title="Explore Apps"
    >
      <Apps
        category={category}
        onPageChange={setPage}
        page={page}
        statsPeriod={statsPeriod}
      />
    </PageLayout>
  );
};

export default AppsPage;

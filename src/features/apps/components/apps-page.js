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
import Card from '../../../components/card';
import CardGrid from '../../../components/card-grid';
import CardGridCol from '../../../components/card-grid-col';
import CardGridRow from '../../../components/card-grid-row';
import PageLayout from '../../../components/page-layout';
import ResponsiveTimePeriodFilter from '../../../components/responsive-time-period-filter';
import useSortOptions from '../../../hooks/use-sort-options';

const AppsPage = () => {
  useMetadata({ title: '0x Protocol App Metrics & Charts' });

  const { navigateTo } = useNavigator();
  const { page, setPage } = usePaginator();
  const { setSortOptions, sortBy, sortDirection } = useSortOptions(
    'tradeVolume',
    'desc',
  );
  const statsPeriod = useSearchParam('statsPeriod', TIME_PERIOD.DAY);

  return (
    <PageLayout
      actions={
        <ResponsiveTimePeriodFilter
          disableExpensive
          name="statsPeriod"
          onChange={(newPeriod) => {
            navigateTo(URL.APPS, {
              sortBy,
              sortDirection,
              statsPeriod: newPeriod,
            });
          }}
          value={statsPeriod}
        />
      }
      icon={<AppsIcon size={40} />}
      subTitle={getPeriodDescriptor(statsPeriod)}
      title="Apps Activity"
    >
      <CardGrid>
        <CardGridRow>
          <CardGridCol>
            <Card errorMessage="An error occurred while loading apps">
              <Apps
                onPageChange={setPage}
                onSort={setSortOptions}
                page={page}
                sortBy={sortBy}
                sortDirection={sortDirection}
                statsPeriod={statsPeriod}
              />
            </Card>
          </CardGridCol>
        </CardGridRow>
      </CardGrid>
    </PageLayout>
  );
};

export default AppsPage;

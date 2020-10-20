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

const AppsPage = () => {
  useMetadata({ title: '0x Protocol App Metrics & Charts' });

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
      icon={<AppsIcon size={40} />}
      subTitle={getPeriodDescriptor(statsPeriod)}
      title="Active Apps"
    >
      <CardGrid>
        <CardGridRow>
          <CardGridCol>
            <Card errorMessage="An error occurred while loading apps">
              <Apps
                onPageChange={setPage}
                page={page}
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

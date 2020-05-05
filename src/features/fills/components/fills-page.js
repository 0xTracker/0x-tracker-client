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
import Fills from './fills';
import FillsFilter from './fills-filter';
import PageLayout from '../../../components/page-layout';

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
            valueFrom,
            valueTo,
          }}
        />
      }
      title="Browse Fills"
    >
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
    </PageLayout>
  );
};

export default FillsPage;

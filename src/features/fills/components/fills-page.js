import React from 'react';

import { useMetadata, usePaginator, useSearchParam } from '../../../hooks';
import Card from '../../../components/card';
import Fills from './fills';
import FillsPageLayout from './fills-page-layout';
import useSortOptions from '../../../hooks/use-sort-options';

const FillsPage = () => {
  useMetadata({ title: 'Browse 0x Protocol Trades' });

  const { page, setPage } = usePaginator();

  const { setSortOptions, sortBy, sortDirection } = useSortOptions(
    'date',
    'desc',
  );

  const apps = useSearchParam('apps', undefined, { isArray: true });
  const status = useSearchParam('status');
  const dateFrom = useSearchParam('dateFrom');
  const dateTo = useSearchParam('dateTo');
  const protocolVersion = useSearchParam('protocolVersion');
  const token = useSearchParam('token');
  const trader = useSearchParam('trader');
  const valueFrom = useSearchParam('valueFrom');
  const valueTo = useSearchParam('valueTo');

  const selectedFilters = {
    apps,
    protocolVersion,
    status,
    token,
    trader,
    valueFrom,
    valueTo,
  };

  const period =
    dateFrom === undefined && dateTo === undefined
      ? 'all'
      : { from: dateFrom, to: dateTo };

  return (
    <FillsPageLayout period={period} selectedFilters={selectedFilters}>
      <Card>
        <Fills
          filter={{ ...selectedFilters, dateFrom, dateTo }}
          onPageChange={setPage}
          onSort={setSortOptions}
          page={page}
          sortBy={sortBy}
          sortDirection={sortDirection}
        />
      </Card>
    </FillsPageLayout>
  );
};

export default FillsPage;

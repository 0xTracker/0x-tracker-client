import _ from 'lodash';
import React from 'react';

import { useMetadata, usePaginator, useSearchParam } from '../../../hooks';
import Card from '../../../components/card';
import CardBody from '../../../components/card-body';
import LoadingIndicator from '../../../components/loading-indicator';
import PageLayout from '../../../components/page-layout';
import SearchResults from './search-results';
import useFills from '../../fills/hooks/use-fills';
import useSortOptions from '../../../hooks/use-sort-options';

const SearchPage = () => {
  useMetadata({ title: 'Search Results' });

  const { page, setPage } = usePaginator();
  const { setSortOptions, sortBy, sortDirection } = useSortOptions(
    'date',
    'desc',
  );
  const searchQuery = useSearchParam('q');
  const [fills, loading] = useFills({
    autoReload: true,
    filter: { q: _.toLower(searchQuery) },
    page,
    sortBy,
    sortDirection,
  });
  const { items, pageCount, pageSize, recordCount } = fills;

  return (
    <PageLayout title="Search Results">
      <Card>
        <CardBody>
          {loading ? (
            <LoadingIndicator centered />
          ) : (
            <SearchResults
              changingPage={loading}
              fills={items}
              onPageChange={setPage}
              onSort={setSortOptions}
              page={page}
              pageCount={pageCount}
              pageSize={pageSize}
              searchQuery={_.toLower(searchQuery)}
              sortBy={sortBy}
              sortDirection={sortDirection}
              total={recordCount}
            />
          )}
        </CardBody>
      </Card>
    </PageLayout>
  );
};

export default SearchPage;

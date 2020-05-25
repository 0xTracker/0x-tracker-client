import _ from 'lodash';
import React from 'react';

import { useMetadata, usePaginator, useSearchParam } from '../../../hooks';
import Card from '../../../components/card';
import CardBody from '../../../components/card-body';
import LoadingIndicator from '../../../components/loading-indicator';
import PageLayout from '../../../components/page-layout';
import SearchResults from './search-results';
import useFills from '../../fills/hooks/use-fills';

const SearchPage = () => {
  useMetadata({ title: 'Search Results' });

  const { page, setPage } = usePaginator();
  const searchQuery = useSearchParam('q');
  const [fills, loading] = useFills({
    autoReload: true,
    filter: { q: _.toLower(searchQuery) },
    page,
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
              page={page}
              pageCount={pageCount}
              pageSize={pageSize}
              searchQuery={_.toLower(searchQuery)}
              total={recordCount}
            />
          )}
        </CardBody>
      </Card>
    </PageLayout>
  );
};

export default SearchPage;

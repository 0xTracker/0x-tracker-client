import _ from 'lodash';
import { Helmet } from 'react-helmet';
import React, { useState } from 'react';
import { useSearchParam } from 'react-use';

import Card from '../../../components/card';
import FillsProvider from '../../fills/components/fills-provider';
import LoadingIndicator from '../../../components/loading-indicator';
import PageLayout from '../../../components/page-layout';
import PageNotFound from '../../../components/page-not-found';
import SearchResults from './search-results';

const SearchPage = () => {
  const searchQuery = useSearchParam('q');
  const [page, setPage] = useState(1);

  if (_.isEmpty(searchQuery)) {
    return <PageNotFound />;
  }

  return (
    <>
      <Helmet>
        <title>Search Results</title>
      </Helmet>
      <PageLayout title="Search Results">
        <Card fullHeight>
          <FillsProvider
            filter={{ address: _.toLower(searchQuery) }}
            page={page}
          >
            {({ changingPage, fills, loading, pageCount, pageSize, total }) =>
              loading ? (
                <LoadingIndicator centered />
              ) : (
                <SearchResults
                  changingPage={changingPage}
                  fills={fills}
                  onPageChange={setPage}
                  page={page}
                  pageCount={pageCount}
                  pageSize={pageSize}
                  searchQuery={_.toLower(searchQuery)}
                  total={total}
                />
              )
            }
          </FillsProvider>
        </Card>
      </PageLayout>
    </>
  );
};

export default SearchPage;

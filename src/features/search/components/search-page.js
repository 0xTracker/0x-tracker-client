import _ from 'lodash';
import { compose, withProps } from 'recompose';
import PropTypes from 'prop-types';
import React, { useState } from 'react';
import qs from 'qs';

import buildSearchUrl from '../util/build-search-url';
import Card from '../../../components/card';
import FillsProvider from '../../fills/components/fills-provider';
import LoadingIndicator from '../../../components/loading-indicator';
import PageLayout from '../../../components/page-layout';
import PageNotFound from '../../../components/page-not-found';
import SearchResults from './search-results';

const SearchPage = ({ searchQuery }) => {
  const [page, setPage] = useState(1);

  if (_.isEmpty(searchQuery)) {
    return <PageNotFound />;
  }

  return (
    <PageLayout
      breadcrumbItems={[
        { title: 'Search Results', url: buildSearchUrl(searchQuery) },
      ]}
      title="Search Results"
    >
      <Card fullHeight>
        <FillsProvider filter={{ address: _.toLower(searchQuery) }} page={page}>
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
  );
};

SearchPage.propTypes = {
  searchQuery: PropTypes.string,
};

SearchPage.defaultProps = {
  searchQuery: null,
};

const enhance = compose(
  withProps(({ location }) => ({
    querystring: qs.parse(location.search.substring(1)),
  })),
  withProps(({ querystring }) => ({
    searchQuery: querystring.q,
  })),
);

export default enhance(SearchPage);

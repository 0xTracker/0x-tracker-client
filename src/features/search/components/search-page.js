import _ from 'lodash';
import React, { useCallback } from 'react';
import PropTypes from 'prop-types';
import { useSearchParam } from 'react-use';

import { URL } from '../../../constants';
import { buildUrl } from '../../../util';
import { useMetadata } from '../../../hooks';
import Card from '../../../components/card';
import LoadingIndicator from '../../../components/loading-indicator';
import PageLayout from '../../../components/page-layout';
import PageNotFound from '../../../components/page-not-found';
import SearchResults from './search-results';
import useFills from '../../fills/hooks/use-fills';

const SearchPage = ({ history, location }) => {
  useMetadata({ title: 'Search Results' });
  const params = new URLSearchParams(location.search);
  const page = Number(params.get('page')) || 1;

  const searchQuery = useSearchParam('q');

  const [fills, loading] = useFills({
    autoReload: true,
    filter: { address: _.toLower(searchQuery) },
    page,
  });

  const onPageChange = useCallback((newPage) => {
    history.push(
      buildUrl(URL.SEARCH, {
        page: newPage,
        q: searchQuery,
      }),
    );
  }, []);

  if (_.isEmpty(searchQuery)) {
    return <PageNotFound />;
  }

  const { items, pageCount, pageSize, recordCount } = fills;

  return (
    <PageLayout title="Search Results">
      <Card autoHeight>
        {loading ? (
          <LoadingIndicator centered />
        ) : (
          <SearchResults
            changingPage={loading}
            fills={items}
            onPageChange={onPageChange}
            page={page}
            pageCount={pageCount}
            pageSize={pageSize}
            searchQuery={_.toLower(searchQuery)}
            total={recordCount}
          />
        )}
      </Card>
    </PageLayout>
  );
};

SearchPage.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
  location: PropTypes.shape({
    search: PropTypes.string.isRequired,
  }).isRequired,
};

export default SearchPage;

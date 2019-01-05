import _ from 'lodash';
import { compose, withProps } from 'recompose';
import PropTypes from 'prop-types';
import React from 'react';
import qs from 'qs';

import buildSearchUrl from '../util/build-search-url';
import Card from '../../../components/card';
import Fills from '../../fills/components/fills';
import PageLayout from '../../../components/page-layout';
import PageNotFound from '../../../components/page-not-found';

const SearchPage = ({ searchQuery }) =>
  _.isEmpty(searchQuery) ? (
    <PageNotFound />
  ) : (
    <PageLayout
      breadcrumbItems={[
        { title: 'Search Results', url: buildSearchUrl(searchQuery) },
      ]}
      title="Search Results"
    >
      <Card fullHeight>
        <Fills filter={{ address: _.toLower(searchQuery) }} showSummary />
      </Card>
    </PageLayout>
  );

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

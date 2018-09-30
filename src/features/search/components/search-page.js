import _ from 'lodash';
import { compose, withProps } from 'recompose';
import PropTypes from 'prop-types';
import React from 'react';
import qs from 'qs';

import buildSearchUrl from '../util/build-search-url';
import ContentHeader from '../../../components/content-header';
import ContentSection from '../../../components/content-section';
import Fills from '../../fills/components/fills';
import PageNotFound from '../../../components/page-not-found';

const SearchPage = ({ searchQuery }) =>
  _.isEmpty(searchQuery) ? (
    <PageNotFound />
  ) : (
    <React.Fragment>
      <ContentHeader
        breadcrumbItems={[
          { title: 'Search Results', url: buildSearchUrl(searchQuery) },
        ]}
        key="pageHeading"
        title="Search Results"
      />
      <ContentSection key="content">
        <Fills filter={{ address: _.toLower(searchQuery) }} showSummary />
      </ContentSection>
      ,
    </React.Fragment>
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

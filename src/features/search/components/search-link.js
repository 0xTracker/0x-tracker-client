import PropTypes from 'prop-types';
import React from 'react';

import buildSearchUrl from '../util/build-search-url';
import Link from '../../../components/link';

const SearchLink = ({ children, className, searchQuery }) => (
  <Link className={className} href={buildSearchUrl(searchQuery)}>
    {children}
  </Link>
);

SearchLink.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
  searchQuery: PropTypes.string.isRequired,
};

SearchLink.defaultProps = {
  className: undefined,
};

export default SearchLink;

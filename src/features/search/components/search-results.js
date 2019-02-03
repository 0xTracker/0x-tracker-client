import PropTypes from 'prop-types';
import React from 'react';
import styled from 'styled-components';

import PagedFillList from '../../fills/components/paged-fill-list';

const NoResults = styled.div`
  align-items: center;
  display: flex;
  flex-grow: 1;
  justify-content: center;
  flex-shrink: 1;
  padding: 2rem;
`;

const SearchResults = ({
  changingPage,
  fills,
  onPageChange,
  page,
  pageCount,
  pageSize,
  searchQuery,
  total,
}) => {
  if (fills.length === 0) {
    return (
      <NoResults>
        <p css="font-size: 1.3rem; text-align: center; word-break: break-word;">
          No results found for <br />
          <span css="font-weight: bold;">&quot;{searchQuery}&quot;</span>
        </p>
      </NoResults>
    );
  }

  return (
    <PagedFillList
      changingPage={changingPage}
      fills={fills}
      onPageChange={onPageChange}
      page={page}
      pageCount={pageCount}
      pageSize={pageSize}
      total={total}
    />
  );
};

SearchResults.propTypes = {
  changingPage: PropTypes.bool,
  fills: PropTypes.arrayOf(PropTypes.object).isRequired,
  onPageChange: PropTypes.func.isRequired,
  page: PropTypes.number.isRequired,
  pageCount: PropTypes.number.isRequired,
  pageSize: PropTypes.number.isRequired,
  searchQuery: PropTypes.string.isRequired,
  total: PropTypes.number.isRequired,
};

SearchResults.defaultProps = {
  changingPage: false,
};

export default SearchResults;

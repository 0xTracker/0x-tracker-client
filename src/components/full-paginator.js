import _ from 'lodash';
import PropTypes from 'prop-types';
import React from 'react';
import ReactLoading from 'react-loading';
import ReactPaginate from 'react-paginate';
import styled from 'styled-components';

import { colors } from '../styles/constants';
import PagingSummary from './paging-summary';

const Pages = styled.div`
  align-items: center;
  display: flex;
  justify-content: flex-end;

  .pagination {
    margin: 0;
    padding: 0;
  }

  .page-item {
    margin: 0 3px 0 0;
  }

  .page-item:last-child {
    margin: 0;
  }

  .page-item .page-link {
    background-color: ${colors.athensGray};
    border: none;
    border-radius: 0;
    color: currentColor;
    cursor: pointer;
    display: block;
    outline: none;
    padding: 0.75rem 1rem;
  }

  .page-item:first-child .page-link {
    border-bottom-left-radius: 0.25rem;
    border-top-left-radius: 0.25rem;
  }

  .page-item:last-child .page-link {
    border-bottom-right-radius: 0.25rem;
    border-top-right-radius: 0.25rem;
  }

  .page-item .page-link:hover {
    background-color: ${colors.mystic};
  }

  .page-item.active .page-link {
    background-color: ${colors.mystic};
  }

  .page-item.disabled .page-link,
  .page-item.disabled .page-link:hover {
    cursor: default;
    color: ${colors.santasGray};
  }
`;

const StyledPaginator = styled.div`
  align-items: center;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin: 1.5rem 2rem;
`;

const LoadingIndicator = styled(ReactLoading).attrs({
  color: 'currentColor',
  delay: 0,
  height: 30,
  type: 'spin',
  width: 30,
})`
  margin-right: 1rem;
`;

const FullPaginator = ({
  changingPage,
  className,
  onPageChange,
  page,
  pageCount,
  pageSize,
  recordCount,
}) => {
  const handlePageChange = (meta) => {
    onPageChange(meta.selected + 1);
  };

  return (
    <StyledPaginator className={className}>
      <PagingSummary
        css="font-weight: bold;"
        page={page}
        pageSize={pageSize}
        recordCount={recordCount}
      />
      <Pages>
        {changingPage && <LoadingIndicator />}
        <ReactPaginate
          activeClassName="active"
          breakClassName="d-none"
          containerClassName="pagination"
          forcePage={page - 1}
          marginPagesDisplayed={0}
          nextClassName="page-item"
          nextLinkClassName="page-link"
          onPageChange={handlePageChange}
          pageClassName="page-item"
          pageCount={pageCount}
          pageLinkClassName="page-link"
          pageRangeDisplayed={5}
          previousClassName="page-item"
          previousLinkClassName="page-link"
        />
      </Pages>
    </StyledPaginator>
  );
};

FullPaginator.propTypes = {
  changingPage: PropTypes.bool,
  className: PropTypes.string,
  onPageChange: PropTypes.func,
  page: PropTypes.number.isRequired,
  pageCount: PropTypes.number.isRequired,
  pageSize: PropTypes.number.isRequired,
  recordCount: PropTypes.number.isRequired,
};

FullPaginator.defaultProps = {
  changingPage: false,
  className: undefined,
  onPageChange: _.noop,
};

export default FullPaginator;

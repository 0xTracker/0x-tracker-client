import styled from 'styled-components';
import PropTypes from 'prop-types';
import React, { PureComponent } from 'react';
import ReactLoading from 'react-loading';
import ReactPaginate from 'react-paginate';

import { media } from '../styles/util';
import { colors } from '../styles/constants';

const StyledPaginator = styled.div`
  align-items: center;
  display: none;
  justify-content: flex-end;

  ${media.greaterThan('md')`
    display: flex;
  `};

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

  .page-item .page-link:hover {
    background-color: ${colors.mischka};
  }

  .page-item.active .page-link {
    background-color: ${colors.mischka};
  }

  .page-item.disabled .page-link,
  .page-item.disabled .page-link:hover {
    cursor: default;
    color: ${colors.santasGray};
  }
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

class Paginator extends PureComponent {
  constructor() {
    super();

    this.handlePageChange = this.handlePageChange.bind(this);
  }

  setPage(page) {
    const { onPageChange } = this.props;

    onPageChange(page);
  }

  handlePageChange(meta) {
    this.setPage(meta.selected + 1);
  }

  render() {
    const { changingPage, className, page, pageCount } = this.props;

    if (page === undefined || pageCount <= 1) {
      return null;
    }

    return (
      <StyledPaginator className={className}>
        {changingPage && <LoadingIndicator />}
        <ReactPaginate
          activeClassName="active"
          breakClassName="d-none"
          containerClassName="pagination"
          forcePage={page - 1}
          marginPagesDisplayed={0}
          nextClassName="page-item"
          nextLinkClassName="page-link"
          onPageChange={this.handlePageChange}
          pageClassName="page-item"
          pageCount={pageCount}
          pageLinkClassName="page-link"
          pageRangeDisplayed={4}
          previousClassName="page-item"
          previousLinkClassName="page-link"
        />
      </StyledPaginator>
    );
  }
}

Paginator.propTypes = {
  changingPage: PropTypes.bool,
  className: PropTypes.string,
  onPageChange: PropTypes.func.isRequired,
  page: PropTypes.number,
  pageCount: PropTypes.number.isRequired,
};

Paginator.defaultProps = {
  changingPage: false,
  className: undefined,
  page: 1,
};

export default Paginator;

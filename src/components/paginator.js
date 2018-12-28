import styled from 'styled-components';
import PropTypes from 'prop-types';
import React, { PureComponent } from 'react';
import ReactLoading from 'react-loading';
import ReactPaginate from 'react-paginate';

import { media } from '../styles/util';

const StyledPaginator = styled.div`
  align-items: center;
  display: none;
  justify-content: flex-end;

  ${media.greaterThan('md')`
    display: flex;
  `};
`;

const LoadingIndicator = styled(ReactLoading).attrs({
  color: 'currentColor',
  delay: 0,
  height: 30,
  type: 'spin',
  width: 30,
})`
  margin-right: 15px;
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
    const { changingPage, page, pageCount } = this.props;

    if (page === undefined || pageCount <= 1) {
      return null;
    }

    return (
      <StyledPaginator>
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
  onPageChange: PropTypes.func.isRequired,
  page: PropTypes.number,
  pageCount: PropTypes.number.isRequired,
};

Paginator.defaultProps = {
  changingPage: false,
  page: 1,
};

export default Paginator;

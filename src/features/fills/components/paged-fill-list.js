import PropTypes from 'prop-types';
import React from 'react';
import Scroll from 'react-scroll';

import FillList from './fill-list';
import Paginator from '../../../components/paginator';

class PagedFillList extends React.PureComponent {
  componentDidUpdate(prevProps) {
    const { changingPage } = this.props;

    if (prevProps.changingPage && !changingPage) {
      Scroll.animateScroll.scrollToTop({ duration: 200 });
    }
  }

  render() {
    const {
      changingPage,
      fills,
      onPageChange,
      onSort,
      page,
      pageCount,
      pageSize,
      sortBy,
      sortDirection,
      total,
    } = this.props;

    return (
      <>
        <FillList
          fills={fills}
          onSort={onSort}
          sortBy={sortBy}
          sortDirection={sortDirection}
        />
        <Paginator
          changingPage={changingPage}
          onPageChange={onPageChange}
          page={page}
          pageCount={pageCount}
          pageSize={pageSize}
          recordCount={total}
        />
      </>
    );
  }
}

PagedFillList.propTypes = {
  changingPage: PropTypes.bool,
  fills: PropTypes.arrayOf(PropTypes.object).isRequired,
  onPageChange: PropTypes.func.isRequired,
  onSort: PropTypes.func.isRequired,
  page: PropTypes.number.isRequired,
  pageCount: PropTypes.number.isRequired,
  pageSize: PropTypes.number.isRequired,
  sortBy: PropTypes.string.isRequired,
  sortDirection: PropTypes.string.isRequired,
  total: PropTypes.number.isRequired,
};

PagedFillList.defaultProps = {
  changingPage: false,
};

export default PagedFillList;

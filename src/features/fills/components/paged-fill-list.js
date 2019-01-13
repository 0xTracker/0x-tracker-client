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
      excludeColumns,
      fills,
      onPageChange,
      page,
      pageCount,
      pageSize,
      total,
    } = this.props;

    return (
      <>
        <FillList excludeColumns={excludeColumns} fills={fills} />
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
  excludeColumns: PropTypes.arrayOf(PropTypes.oneOf(['relayer'])),
  fills: PropTypes.arrayOf(PropTypes.object).isRequired,
  onPageChange: PropTypes.func.isRequired,
  page: PropTypes.number.isRequired,
  pageCount: PropTypes.number.isRequired,
  pageSize: PropTypes.number.isRequired,
  total: PropTypes.number.isRequired,
};

PagedFillList.defaultProps = {
  changingPage: false,
  excludeColumns: undefined,
};

export default PagedFillList;

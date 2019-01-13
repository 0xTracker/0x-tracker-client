import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import React from 'react';

import MobilePaginator from './mobile-paginator';
import FullPaginator from './full-paginator';

const Paginator = ({
  changingPage,
  onPageChange,
  page,
  pageCount,
  pageSize,
  recordCount,
  screenSize,
}) => {
  if (screenSize.greaterThan.sm) {
    return (
      <FullPaginator
        changingPage={changingPage}
        onPageChange={onPageChange}
        page={page}
        pageCount={pageCount}
        pageSize={pageSize}
        recordCount={recordCount}
      />
    );
  }

  return (
    <MobilePaginator
      changingPage={changingPage}
      onPageChange={onPageChange}
      page={page}
      pageCount={pageCount}
      pageSize={pageSize}
      recordCount={recordCount}
    />
  );
};

Paginator.propTypes = {
  changingPage: PropTypes.bool,
  onPageChange: PropTypes.func.isRequired,
  page: PropTypes.number,
  pageCount: PropTypes.number.isRequired,
  pageSize: PropTypes.number.isRequired,
  recordCount: PropTypes.number.isRequired,
  screenSize: PropTypes.object.isRequired,
};

Paginator.defaultProps = {
  changingPage: false,
  page: 1,
};

export default connect(state => ({ screenSize: state.screen }))(Paginator);

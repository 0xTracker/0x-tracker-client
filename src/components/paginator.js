import PropTypes from 'prop-types';
import React from 'react';

import { useCurrentBreakpoint } from '../responsive-utils';
import MobilePaginator from './mobile-paginator';
import FullPaginator from './full-paginator';

const Paginator = ({
  changingPage,
  onPageChange,
  page,
  pageCount,
  pageSize,
  recordCount,
}) => {
  const breakpoint = useCurrentBreakpoint();

  if (breakpoint.greaterThan('sm')) {
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
};

Paginator.defaultProps = {
  changingPage: false,
  page: 1,
};

export default Paginator;

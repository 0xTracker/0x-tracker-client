import React from 'react';
import PropTypes from 'prop-types';

import LoadingIndicator from '../../../components/loading-indicator';
import PagedFillList from './paged-fill-list';
import useFills from '../hooks/use-fills';

const Fills = ({ excludeColumns, filter, page, onPageChange }) => {
  const [fills, loading] = useFills({
    autoReload: true,
    filter,
    page,
  });

  const { items, pageCount, pageSize, recordCount } = fills;

  return loading ? (
    <LoadingIndicator centered />
  ) : (
    <PagedFillList
      excludeColumns={excludeColumns}
      fills={items}
      onPageChange={onPageChange}
      page={page}
      pageCount={pageCount}
      pageSize={pageSize}
      total={recordCount}
    />
  );
};

Fills.propTypes = {
  excludeColumns: PropTypes.arrayOf(PropTypes.oneOf(['relayer'])),
  filter: PropTypes.shape({
    address: PropTypes.string,
    token: PropTypes.string,
  }),
  onPageChange: PropTypes.func.isRequired,
  page: PropTypes.number.isRequired,
};

Fills.defaultProps = {
  excludeColumns: undefined,
  filter: {},
};

export default Fills;

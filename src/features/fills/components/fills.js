import React from 'react';
import PropTypes from 'prop-types';

import CardPlaceholder from '../../../components/card-placeholder';
import fillsPropTypes from '../prop-types';
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

  if (loading) {
    return <LoadingIndicator centered />;
  }

  if (items.length === 0) {
    return (
      <CardPlaceholder>
        No trades were found matching the selected filters.
      </CardPlaceholder>
    );
  }

  return (
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
    dateFrom: PropTypes.string,
    dateTo: PropTypes.string,
    protocolVersion: PropTypes.number,
    status: fillsPropTypes.status,
    token: PropTypes.string,
    trader: PropTypes.string,
  }),
  onPageChange: PropTypes.func.isRequired,
  page: PropTypes.number.isRequired,
};

Fills.defaultProps = {
  excludeColumns: undefined,
  filter: {},
};

export default Fills;

import React from 'react';
import PropTypes from 'prop-types';

import CardPlaceholder from '../../../components/card-placeholder';
import fillsPropTypes from '../prop-types';
import LoadingIndicator from '../../../components/loading-indicator';
import PagedFillList from './paged-fill-list';
import useFills from '../hooks/use-fills';

const Fills = ({
  filter,
  page,
  onPageChange,
  onSort,
  sortBy,
  sortDirection,
}) => {
  const [fills, loading] = useFills({
    autoReload: true,
    filter,
    page,
    sortBy,
    sortDirection,
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
      fills={items}
      onPageChange={onPageChange}
      onSort={onSort}
      page={page}
      pageCount={pageCount}
      pageSize={pageSize}
      sortBy={sortBy}
      sortDirection={sortDirection}
      total={recordCount}
    />
  );
};

Fills.propTypes = {
  filter: PropTypes.shape({
    address: PropTypes.string,
    apps: PropTypes.arrayOf(PropTypes.string.isRequired),
    dateFrom: PropTypes.string,
    dateTo: PropTypes.string,
    protocolVersion: PropTypes.number,
    status: fillsPropTypes.status,
    token: PropTypes.string,
    trader: PropTypes.string,
  }),
  onPageChange: PropTypes.func.isRequired,
  onSort: PropTypes.func.isRequired,
  page: PropTypes.number.isRequired,
  sortBy: PropTypes.string.isRequired,
  sortDirection: PropTypes.string.isRequired,
};

Fills.defaultProps = {
  filter: {},
};

export default Fills;

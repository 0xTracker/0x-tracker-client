import React, { useState } from 'react';
import PropTypes from 'prop-types';

import FillsProvider from './fills-provider';
import LoadingIndicator from '../../../components/loading-indicator';
import PagedFillList from './paged-fill-list';

const Fills = ({ excludeColumns, filter }) => {
  const [page, setPage] = useState(1);

  return (
    <FillsProvider filter={filter} page={page}>
      {({ changingPage, fills, loading, pageCount, pageSize, total }) =>
        loading ? (
          <LoadingIndicator centered />
        ) : (
          <PagedFillList
            changingPage={changingPage}
            excludeColumns={excludeColumns}
            fills={fills}
            onPageChange={setPage}
            page={page}
            pageCount={pageCount}
            pageSize={pageSize}
            total={total}
          />
        )
      }
    </FillsProvider>
  );
};

Fills.propTypes = {
  excludeColumns: PropTypes.arrayOf(PropTypes.oneOf(['relayer'])),
  filter: PropTypes.shape({
    address: PropTypes.string,
    token: PropTypes.string,
  }),
};

Fills.defaultProps = {
  excludeColumns: undefined,
  filter: undefined,
};

export default Fills;

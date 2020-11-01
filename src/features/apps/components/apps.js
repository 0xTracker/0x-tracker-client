import PropTypes from 'prop-types';
import React from 'react';

import AppList from './app-list';
import LoadingIndicator from '../../../components/loading-indicator';
import Paginator from '../../../components/paginator';
import useApps from '../hooks/use-apps';

const Apps = ({
  onPageChange,
  onSort,
  page,
  sortBy,
  sortDirection,
  statsPeriod,
}) => {
  const [apps, loading] = useApps({
    autoReload: true,
    limit: 25,
    page,
    sortBy,
    sortDirection,
    statsPeriod,
  });

  const { items, pageCount, pageSize, recordCount } = apps;

  if (loading) {
    return <LoadingIndicator centered />;
  }

  return (
    <>
      <AppList
        apps={items}
        onSort={onSort}
        positionOffset={(page - 1) * pageSize}
        sortBy={sortBy}
        sortDirection={sortDirection}
        statsPeriod={statsPeriod}
      />
      <Paginator
        onPageChange={onPageChange}
        page={page}
        pageCount={pageCount}
        pageSize={pageSize}
        recordCount={recordCount}
      />
    </>
  );
};

Apps.propTypes = {
  onPageChange: PropTypes.func.isRequired,
  onSort: PropTypes.func.isRequired,
  page: PropTypes.number,
  sortBy: PropTypes.string.isRequired,
  sortDirection: PropTypes.string.isRequired,
  statsPeriod: PropTypes.string,
};

Apps.defaultProps = {
  page: undefined,
  statsPeriod: undefined,
};

export default Apps;

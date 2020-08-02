import PropTypes from 'prop-types';
import React from 'react';

import AppsGrid from './apps-grid';
import LoadingIndicator from '../../../components/loading-indicator';
import Paginator from '../../../components/paginator';
import useApps from '../hooks/use-apps';

const Apps = ({ onPageChange, page, statsPeriod }) => {
  const [assetBridges, loading] = useApps({
    autoReload: true,
    limit: 25,
    page,
    statsPeriod,
  });

  const { items, pageCount, pageSize, recordCount } = assetBridges;

  if (loading) {
    return <LoadingIndicator centered />;
  }

  return (
    <>
      <AppsGrid
        apps={items}
        positionOffset={(page - 1) * pageSize}
        statsPeriod={statsPeriod}
      />
      {pageCount > 1 && (
        <Paginator
          onPageChange={onPageChange}
          page={page}
          pageCount={pageCount}
          pageSize={pageSize}
          recordCount={recordCount}
        />
      )}
    </>
  );
};

Apps.propTypes = {
  onPageChange: PropTypes.func.isRequired,
  page: PropTypes.number,
  statsPeriod: PropTypes.string,
};

Apps.defaultProps = {
  page: undefined,
  statsPeriod: undefined,
};

export default Apps;

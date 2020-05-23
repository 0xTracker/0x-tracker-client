import PropTypes from 'prop-types';
import React from 'react';

import AssetBridgeList from './asset-bridge-list';
import LoadingIndicator from '../../../components/loading-indicator';
import Paginator from '../../../components/paginator';
import useAssetBridges from '../hooks/use-asset-bridges';

const AssetBridges = ({ onPageChange, page, statsPeriod }) => {
  const [assetBridges, loading] = useAssetBridges({
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
      <AssetBridgeList
        assetBridges={items}
        positionOffset={(page - 1) * pageSize}
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

AssetBridges.propTypes = {
  onPageChange: PropTypes.func.isRequired,
  page: PropTypes.number,
  statsPeriod: PropTypes.string,
};

AssetBridges.defaultProps = {
  page: undefined,
  statsPeriod: undefined,
};

export default AssetBridges;

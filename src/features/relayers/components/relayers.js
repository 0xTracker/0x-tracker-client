import PropTypes from 'prop-types';
import React from 'react';

import LoadingIndicator from '../../../components/loading-indicator';
import Paginator from '../../../components/paginator';
import RelayerList from './relayer-list';
import useRelayers from '../hooks/use-relayers';

const Relayers = ({ onPageChange, page, statsPeriod }) => {
  const [relayers, loadingRelayers] = useRelayers({
    autoReload: true,
    limit: 25,
    page,
    statsPeriod,
  });

  const { items, pageCount, pageSize, recordCount } = relayers;

  if (loadingRelayers) {
    return <LoadingIndicator centered />;
  }

  return (
    <>
      <RelayerList
        positionOffset={(page - 1) * pageSize}
        relayers={items}
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

Relayers.propTypes = {
  onPageChange: PropTypes.func.isRequired,
  page: PropTypes.number,
  statsPeriod: PropTypes.string,
};

Relayers.defaultProps = {
  page: undefined,
  statsPeriod: undefined,
};

export default Relayers;

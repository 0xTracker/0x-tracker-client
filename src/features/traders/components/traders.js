import PropTypes from 'prop-types';
import React from 'react';

import LoadingIndicator from '../../../components/loading-indicator';
import Paginator from '../../../components/paginator';
import TraderList from './trader-list';
import useTraders from '../hooks/use-traders';

const SORT_BY_MAPPINGS = {
  maker: 'tradeVolume.maker',
  taker: 'tradeVolume.taker',
  undefined: 'tradeVolume.total',
};

const Traders = ({ onPageChange, page, statsPeriod, type }) => {
  const [traders, loading] = useTraders({
    autoReload: true,
    limit: 25,
    page,
    sortBy: SORT_BY_MAPPINGS[type],
    statsPeriod,
    type,
  });

  const { items, pageCount, pageSize, recordCount } = traders;

  if (loading) {
    return <LoadingIndicator centered />;
  }

  return (
    <>
      <TraderList
        positionOffset={(page - 1) * pageSize}
        statsPeriod={statsPeriod}
        statsType={type}
        traders={items}
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

Traders.propTypes = {
  onPageChange: PropTypes.func.isRequired,
  page: PropTypes.number,
  statsPeriod: PropTypes.string,
  type: PropTypes.string,
};

Traders.defaultProps = {
  page: undefined,
  statsPeriod: undefined,
  type: undefined,
};

export default Traders;

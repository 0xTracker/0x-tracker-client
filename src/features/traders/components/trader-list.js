import PropTypes from 'prop-types';
import React from 'react';

import Number from '../../../components/number';
import tradersPropTypes from '../prop-types';
import TraderLink from './trader-link';
import TraderVolumeLabel from './trader-volume-label';

const TraderList = ({ positionOffset, traders }) => (
  <table className="table table-responsive">
    <thead>
      <tr>
        <th>#</th>
        <th>Trader</th>
        <th className="text-right">Fills</th>
        <th className="text-right">Volume</th>
      </tr>
    </thead>
    <tbody>
      {traders.map((trader, index) => (
        <tr key={trader.address}>
          <td className="align-middle">{`${positionOffset + index + 1}`}</td>
          <td className="align-middle" width="99%">
            <TraderLink address={trader.address}>{trader.address}</TraderLink>
          </td>
          <td className="align-middle text-right">
            <Number>{trader.stats.fillCount.total}</Number>
          </td>
          <td className="align-middle text-right">
            <TraderVolumeLabel stats={trader.stats} />
          </td>
        </tr>
      ))}
    </tbody>
  </table>
);

TraderList.propTypes = {
  positionOffset: PropTypes.number,
  traders: PropTypes.arrayOf(tradersPropTypes.traderWithStats).isRequired,
};

TraderList.defaultProps = {
  positionOffset: 0,
};

export default TraderList;

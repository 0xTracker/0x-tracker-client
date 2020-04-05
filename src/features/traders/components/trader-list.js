import PropTypes from 'prop-types';
import React from 'react';
import styled, { css } from 'styled-components';

import { colors } from '../../../styles/constants';
import tradersPropTypes from '../prop-types';
import TraderLink from './trader-link';
import TraderFillCountLabel from './trader-fill-count-label';
import TraderVolumeLabel from './trader-volume-label';

const ColumnDescriptor = styled.span`
  color: ${colors.lavenderGray};
`;

const SpacerColumn = styled.td`
  color: ${colors.mystic};
  font-weight: bold;
  padding: 0 !important;
`;

const SplitValueColumn = styled.td`
  ${(props) =>
    props.side === 'left'
      ? css`
          padding-right: 1rem !important;
        `
      : css`
          padding-left: 1rem !important;
        `}
`;

const TraderList = ({ positionOffset, traders }) => (
  <table className="table table-responsive">
    <thead>
      <tr>
        <th className="align-middle">#</th>
        <th className="align-middle">Trader</th>
        <th className="text-center" colSpan={3}>
          Fill Count
          <br />
          <ColumnDescriptor>(maker / taker)</ColumnDescriptor>
        </th>
        <th className="text-center" colSpan={3}>
          Fill Volume
          <br />
          <ColumnDescriptor>(maker / taker)</ColumnDescriptor>
        </th>
      </tr>
    </thead>
    <tbody>
      {traders.map((trader, index) => (
        <tr key={trader.address}>
          <td className="align-middle">{`${positionOffset + index + 1}`}</td>
          <td className="align-middle" width="99%">
            <TraderLink address={trader.address}>{trader.address}</TraderLink>
          </td>
          <SplitValueColumn className="align-middle text-center" side="left">
            <TraderFillCountLabel>
              {trader.stats.fillCount.maker}
            </TraderFillCountLabel>
          </SplitValueColumn>
          <SpacerColumn className="align-middle text-center">/</SpacerColumn>
          <SplitValueColumn className="align-middle text-center" side="right">
            <TraderFillCountLabel>
              {trader.stats.fillCount.taker}
            </TraderFillCountLabel>
          </SplitValueColumn>
          <SplitValueColumn className="align-middle text-center" side="left">
            <TraderVolumeLabel value={trader.stats.fillVolume.maker} />
          </SplitValueColumn>
          <SpacerColumn className="align-middle text-center">/</SpacerColumn>
          <SplitValueColumn className="align-middle text-center" side="right">
            <TraderVolumeLabel value={trader.stats.fillVolume.taker} />
          </SplitValueColumn>
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

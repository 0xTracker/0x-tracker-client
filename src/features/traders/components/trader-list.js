import PropTypes from 'prop-types';
import React from 'react';

import { COLORS } from '../../../styles/constants';
import { ExternalLinkIcon, MoreIcon } from '../../../components/icons';
import Badge from '../../../components/badge';
import Blockie from '../../../components/blockie';
import Link from '../../../components/link';
import Rank from '../../../components/rank';
import Tooltip from '../../../components/tooltip';
import tradersPropTypes from '../prop-types';
import TraderLink from './trader-link';
import TraderFillCountLabel from './trader-fill-count-label';
import TraderVolumeLabel from './trader-volume-label';

const TraderList = ({ positionOffset, traders }) => (
  <table className="table table-responsive">
    <thead>
      <tr>
        <th className="align-middle text-center">#</th>
        <th className="align-middle" colSpan={2}>
          Trader
        </th>
        <th className="text-center">Fills</th>
        <th className="text-center">Volume</th>
        <th title="Actions" />
      </tr>
    </thead>
    <tbody>
      {traders.map((trader, index) => (
        <tr key={trader.address}>
          <td className="align-middle text-center">
            <Rank>{positionOffset + index + 1}</Rank>
          </td>
          <td className="align-middle">
            <TraderLink address={trader.address}>
              <Blockie
                css="border-radius: 0.25rem; vertical-align: middle;"
                seed={trader.address}
                size="40px"
              />
            </TraderLink>
          </td>
          <td className="align-middle" width="99%">
            <span css="display: block; font-weight: 500; line-height: 1; margin-bottom: 4px;">
              <TraderLink address={trader.address}>{trader.address}</TraderLink>
            </span>
            {trader.stats.fillCount.maker > 0 && (
              <Badge
                bgColor={COLORS.ACCENT.ANZAC_500}
                css="margin-right: 0.5rem;"
                textColor={COLORS.ACCENT.ANZAC_1000}
              >
                maker
              </Badge>
            )}
            {trader.stats.fillCount.taker > 0 && (
              <Badge
                bgColor={COLORS.ACCENT.FRUIT_SALAD_500}
                textColor={COLORS.ACCENT.FRUIT_SALAD_1000}
              >
                taker
              </Badge>
            )}
          </td>
          <td className="align-middle text-center" side="left">
            <TraderFillCountLabel>
              {trader.stats.fillCount}
            </TraderFillCountLabel>
          </td>
          <td className="align-middle text-center" side="left">
            <TraderVolumeLabel volume={trader.stats.fillVolume} />
          </td>
          <td className="align-middle text-center">
            <Tooltip content="View Detail">
              <span>
                <TraderLink
                  address={trader.address}
                  css={`
                    color: ${COLORS.NEUTRAL.MYSTIC_700};
                    margin-right: 0.5rem;

                    &:hover {
                      color: inherit;
                    }
                  `}
                >
                  <MoreIcon height={24} width={24} />
                </TraderLink>
              </span>
            </Tooltip>
            <Tooltip content="View on Etherscan">
              <span>
                <Link
                  css={`
                    color: ${COLORS.NEUTRAL.MYSTIC_700};

                    &:hover {
                      color: inherit;
                    }
                  `}
                  href={`https://etherscan.io/address/${trader.address}`}
                >
                  <ExternalLinkIcon height={24} width={24} />
                </Link>
              </span>
            </Tooltip>
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

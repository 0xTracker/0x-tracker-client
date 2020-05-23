import _ from 'lodash';
import PropTypes from 'prop-types';
import React from 'react';

import { COLORS } from '../../../styles/constants';
import { EtherscanIcon, MoreIcon } from '../../../components/icons';
import Badge from '../../../components/badge';
import Blockie from '../../../components/blockie';
import HelpWidget from '../../../components/help-widget';
import Link from '../../../components/link';
import Rank from '../../../components/rank';
import Tooltip from '../../../components/tooltip';
import tradersPropTypes from '../prop-types';
import TraderLink from './trader-link';
import TraderFillCountLabel from './trader-fill-count-label';
import TraderVolumeLabel from './trader-volume-label';
import MiniTraderMetrics from './mini-trader-metrics';

const DESCRIPTOR_MAPPINGS = {
  maker: 'Maker',
  taker: 'Taker',
  undefined: 'Trader',
};

const METRIC_TYPE_MAPPINGS = {
  maker: 'fillVolume.maker',
  taker: 'fillVolume.taker',
  undefined: 'fillVolume.total',
};

const TraderList = ({ positionOffset, statsPeriod, statsType, traders }) => (
  <table className="table table-responsive">
    <thead>
      <tr>
        <th className="text-center">#</th>
        <th colSpan={2}>{DESCRIPTOR_MAPPINGS[statsType]}</th>
        <th className="text-center">
          Fills
          <HelpWidget css="margin-left: 0.25rem;">
            The number of unique fills for a given{' '}
            {DESCRIPTOR_MAPPINGS[statsType].toLowerCase()} in the selected
            period.
          </HelpWidget>
        </th>
        <th className="text-center">
          Volume
          <HelpWidget css="margin-left: 0.25rem;">
            The total value of all fills that a given{' '}
            {DESCRIPTOR_MAPPINGS[statsType].toLowerCase()} participated in for
            the selected period.
          </HelpWidget>
        </th>
        <th>
          Volume Trend
          <HelpWidget css="margin-left: 0.25rem;">
            Volume trend for a given{' '}
            {DESCRIPTOR_MAPPINGS[statsType].toLowerCase()} in the selected
            period.
          </HelpWidget>
        </th>
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
              {_.isString(trader.imageUrl) ? (
                <img
                  css="border-radius: 0.25rem; vertical-align: middle;"
                  src={trader.imageUrl}
                  width={40}
                />
              ) : (
                <Blockie
                  css="border-radius: 0.25rem; vertical-align: middle;"
                  seed={trader.address}
                  size="40px"
                />
              )}
            </TraderLink>
          </td>
          <td className="align-middle" width="99%">
            <span css="display: block; line-height: 1; margin-bottom: 4px;">
              <TraderLink address={trader.address}>{trader.address}</TraderLink>
            </span>
            {trader.name && (
              <Badge
                bgColor={COLORS.NEUTRAL.MYSTIC_400}
                css="margin-right: 0.5rem;"
                textColor={COLORS.NEUTRAL.MYSTIC_1000}
              >
                {trader.name}
              </Badge>
            )}
            {trader.stats.fillCount.maker > 0 && (
              <Tooltip content="This trader has been a maker during the selected period.">
                <Badge
                  bgColor={COLORS.ACCENT.ANZAC_500}
                  css="margin-right: 0.5rem;"
                  textColor={COLORS.ACCENT.ANZAC_1000}
                >
                  maker
                </Badge>
              </Tooltip>
            )}
            {trader.stats.fillCount.taker > 0 && (
              <Tooltip content="This trader has been a taker during the selected period.">
                <Badge
                  bgColor={COLORS.ACCENT.FRUIT_SALAD_500}
                  textColor={COLORS.ACCENT.FRUIT_SALAD_1000}
                >
                  taker
                </Badge>
              </Tooltip>
            )}
          </td>
          <td className="align-middle text-center" side="left">
            <TraderFillCountLabel statsType={statsType}>
              {trader.stats.fillCount}
            </TraderFillCountLabel>
          </td>
          <td className="align-middle text-center" side="left">
            <TraderVolumeLabel
              statsType={statsType}
              volume={trader.stats.fillVolume}
            />
          </td>
          <td>
            <MiniTraderMetrics
              address={trader.address}
              height={40}
              period={statsPeriod}
              type={METRIC_TYPE_MAPPINGS[statsType]}
              width={120}
            />
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
                  <EtherscanIcon size={20} />
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
  statsPeriod: PropTypes.string.isRequired,
  statsType: PropTypes.string,
  traders: PropTypes.arrayOf(tradersPropTypes.traderWithStats).isRequired,
};

TraderList.defaultProps = {
  positionOffset: 0,
  statsType: undefined,
};

export default TraderList;

import _ from 'lodash';
import PropTypes from 'prop-types';
import React from 'react';

import { BASE_CURRENCY } from '../../currencies/constants';
import { DATE_FORMAT } from '../../../constants';
import { COLORS } from '../../../styles/constants';
import { MoreIcon } from '../../../components/icons';
import buildFillUrl from '../util/build-fill-url';
import FillListAssets from './fill-list-assets';
import FillRelayerLink from './fill-relayer-link';
import formatDate from '../../../util/format-date';
import Link from '../../../components/link';
import LocalisedAmount from '../../currencies/components/localised-amount';

const FillList = ({ excludeColumns, fills }) => {
  const includeColumn = (column) => !excludeColumns.includes(column);

  return (
    <table className="table table-responsive">
      <thead>
        <tr>
          <th>Date</th>
          <th colSpan={3}>Traded Assets</th>
          <th>Protocol</th>
          <th className="text-right">Protocol Fee</th>
          <th className="text-right">Value</th>
          {includeColumn('relayer') && <th>Relayer</th>}
          <th title="View" />
        </tr>
      </thead>
      <tbody>
        {fills.map((fill, index) => (
          <tr className={index % 2 ? 'even' : 'odd'} key={fill.id}>
            <td title={formatDate(fill.date, DATE_FORMAT.FULL)}>
              {formatDate(fill.date, DATE_FORMAT.RELATIVE)}
            </td>
            <td className="text-right">
              <FillListAssets
                assets={_.filter(fill.assets, { traderType: 'maker' })}
                linked
              />
            </td>
            <td className="text-center">&#8651;</td>
            <td className="text-right" width="99%">
              <FillListAssets
                assets={_.filter(fill.assets, { traderType: 'taker' })}
                linked
              />
            </td>
            <td>v{fill.protocolVersion}</td>
            <td className="text-right">
              {fill.protocolFee === undefined ? (
                <span
                  css={`
                    color: ${COLORS.NEUTRAL.MYSTIC_600};
                  `}
                >
                  -
                </span>
              ) : (
                <LocalisedAmount amount={fill.protocolFee.USD} />
              )}
            </td>
            <td className="text-right">
              {_.has(fill, `value.${BASE_CURRENCY}`) ? (
                <LocalisedAmount amount={fill.value[BASE_CURRENCY]} />
              ) : (
                <span
                  css={`
                    color: ${COLORS.NEUTRAL.MYSTIC_600};
                  `}
                >
                  -
                </span>
              )}
            </td>
            {includeColumn('relayer') && (
              <td>
                <FillRelayerLink fill={fill} showImage />
              </td>
            )}
            <td
              className="text-center"
              css={`
                color: ${COLORS.NEUTRAL.MYSTIC_700};

                &:hover {
                  color: inherit;
                }
              `}
            >
              <Link href={buildFillUrl(fill.id)} title="View Transaction">
                <MoreIcon height={24} width={24} />
              </Link>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

FillList.propTypes = {
  excludeColumns: PropTypes.arrayOf(PropTypes.oneOf(['relayer'])),
  fills: PropTypes.arrayOf(PropTypes.object).isRequired,
};

FillList.defaultProps = {
  excludeColumns: [],
};

export default FillList;

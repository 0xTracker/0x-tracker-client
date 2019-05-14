import _ from 'lodash';
import { distanceInWordsToNow, format as formatDate } from 'date-fns';
import PropTypes from 'prop-types';
import React from 'react';

import { BASE_CURRENCY } from '../../currencies/constants';
import { ZRX_TOKEN } from '../../../constants';
import { MoreIcon } from '../../../components/icons';
import buildFillUrl from '../util/build-fill-url';
import FillListAssets from './fill-list-assets';
import FillRelayerLink from './fill-relayer-link';
import Link from '../../../components/link';
import LocalisedAmount from '../../currencies/components/localised-amount';
import TokenAmount from '../../tokens/components/token-amount';

const FillList = ({ excludeColumns, fills }) => {
  const includeColumn = column => !excludeColumns.includes(column);

  return (
    <table className="table table-responsive">
      <thead>
        <tr>
          <th>Date</th>
          <th className="text-right">Maker Amount</th>
          <th />
          <th className="text-right">Taker Amount</th>
          <th className="text-right">Value</th>
          {includeColumn('relayer') && <th>Relayer</th>}
          <th className="text-right">Fees (ZRX)</th>
          <th title="View" />
        </tr>
      </thead>
      <tbody>
        {fills.map((fill, index) => (
          <tr className={index % 2 ? 'even' : 'odd'} key={fill.id}>
            <td title={formatDate(fill.date, 'dddd, MMMM Do YYYY, h:mm:ss a')}>
              {distanceInWordsToNow(fill.date)} ago
            </td>
            <td className="text-right">
              <FillListAssets
                assets={_.filter(fill.assets, { traderType: 'maker' })}
                linked
              />
            </td>
            <td className="text-center" width="99%">
              &#8651;
            </td>
            <td className="text-right">
              <FillListAssets
                assets={_.filter(fill.assets, { traderType: 'taker' })}
                linked
              />
            </td>
            <td className="text-right">
              {_.has(fill, `amount.${BASE_CURRENCY}`) ? (
                <LocalisedAmount amount={fill.amount[BASE_CURRENCY]} />
              ) : (
                '-'
              )}
            </td>
            {includeColumn('relayer') && (
              <td>
                <FillRelayerLink fill={fill} showImage />
              </td>
            )}
            <td className="text-right">
              <TokenAmount amount={fill.totalFees.ZRX} token={ZRX_TOKEN} />
            </td>
            <td className="text-center">
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

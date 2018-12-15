import _ from 'lodash';
import { connect } from 'react-redux';
import { distanceInWordsToNow, format as formatDate } from 'date-fns';
import { MoreHoriz as MoreIcon } from 'styled-icons/material/MoreHoriz';
import PropTypes from 'prop-types';
import React from 'react';

import { BASE_CURRENCY } from '../../currencies/constants';
import { getDisplayCurrency } from '../../currencies/selectors';
import { ZRX_TOKEN } from '../../../constants';
import buildFillUrl from '../util/build-fill-url';
import FillRelayerLink from './fill-relayer-link';
import FillStatusLabel from './fill-status-label';
import Link from '../../../components/link';
import LocalisedAmount from '../../currencies/components/localised-amount';
import TokenAmount from '../../tokens/components/token-amount';

const FillList = ({ displayCurrency, excludeColumns, showStatus, fills }) => {
  const includeColumn = column => !excludeColumns.includes(column);

  return (
    <table className="table table-responsive">
      <thead>
        <tr>
          <th title="View" />
          <th>Date</th>
          <th className="text-right">Maker Amount</th>
          <th />
          <th className="text-right">Taker Amount</th>
          <th className="text-right">Amount ({displayCurrency})</th>
          {includeColumn('relayer') && <th>Relayer</th>}
          {showStatus && <th>Status</th>}
          <th className="text-right">Fees (ZRX)</th>
        </tr>
      </thead>
      <tbody>
        {fills.map((fill, index) => (
          <tr className={index % 2 ? 'even' : 'odd'} key={fill.id}>
            <td className="text-center">
              <Link href={buildFillUrl(fill.id)} title="View Transaction">
                <MoreIcon height={24} width={24} />
              </Link>
            </td>
            <td title={formatDate(fill.date, 'dddd, MMMM Do YYYY, h:mm:ss a')}>
              {distanceInWordsToNow(fill.date)} ago
            </td>
            <td className="text-right">
              <TokenAmount amount={fill.makerAmount} token={fill.makerToken} />
            </td>
            <td className="text-center" width="99%">
              &#8651;
            </td>
            <td className="text-right">
              <TokenAmount amount={fill.takerAmount} token={fill.takerToken} />
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
                <FillRelayerLink fill={fill} />
              </td>
            )}
            {showStatus && (
              <td>
                <FillStatusLabel status={fill.status} />
              </td>
            )}
            <td className="text-right">
              <TokenAmount amount={fill.totalFees.ZRX} token={ZRX_TOKEN} />
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

FillList.propTypes = {
  displayCurrency: PropTypes.string.isRequired,
  excludeColumns: PropTypes.arrayOf(PropTypes.oneOf(['relayer'])),
  fills: PropTypes.arrayOf(PropTypes.object),
  showStatus: PropTypes.bool,
};

FillList.defaultProps = {
  excludeColumns: [],
  fills: undefined,
  showStatus: false,
};

const mapStateToProps = state => ({
  displayCurrency: getDisplayCurrency(state),
});

export default connect(mapStateToProps)(FillList);

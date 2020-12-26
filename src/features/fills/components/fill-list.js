import _ from 'lodash';
import PropTypes from 'prop-types';
import React from 'react';

import { BASE_CURRENCY } from '../../currencies/constants';
import { DATE_FORMAT } from '../../../constants';
import { COLORS } from '../../../styles/constants';
import { MoreIcon } from '../../../components/icons';
import buildFillUrl from '../util/build-fill-url';
import FillListApps from './fill-list-apps';
import FillListAssets from './fill-list-assets';
import formatDate from '../../../util/format-date';
import Link from '../../../components/link';
import LocalisedAmount from '../../currencies/components/localised-amount';
import Th from '../../../components/th';
import useTableSort from '../../../hooks/use-table-sort';

const FillList = ({ fills, onSort, sortBy, sortDirection }) => {
  const { getSortableColumnProps } = useTableSort({
    onSort,
    sortBy,
    sortDirection,
  });

  return (
    <table className="table table-responsive">
      <thead>
        <tr>
          <Th {...getSortableColumnProps('date')}>Date</Th>
          <th colSpan={3}>Traded Assets</th>
          <th>Associated Apps</th>
          <Th {...getSortableColumnProps('value')} className="text-right">
            Traded Value
          </Th>
          <Th
            {...getSortableColumnProps('protocolFeeUSD')}
            className="text-right"
          >
            Protocol Fee
          </Th>
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
            <td>
              <FillListApps apps={fill.apps} />
            </td>
            <td className="text-right">
              {_.has(fill, `value.${BASE_CURRENCY}`) ? (
                <LocalisedAmount amount={fill.value[BASE_CURRENCY]} />
              ) : (
                <span
                  css={`
                    color: ${COLORS.NEUTRAL.MYSTIC_700};
                  `}
                >
                  -
                </span>
              )}
            </td>
            <td className="text-right">
              {fill.protocolFee === undefined ? (
                <span
                  css={`
                    color: ${COLORS.NEUTRAL.MYSTIC_700};
                  `}
                >
                  -
                </span>
              ) : (
                <LocalisedAmount amount={fill.protocolFee.USD} />
              )}
            </td>

            <td
              className="text-center"
              css={`
                color: ${COLORS.NEUTRAL.MYSTIC_800};

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
  fills: PropTypes.arrayOf(PropTypes.object).isRequired,
  onSort: PropTypes.func.isRequired,
  sortBy: PropTypes.string.isRequired,
  sortDirection: PropTypes.string.isRequired,
};

export default FillList;

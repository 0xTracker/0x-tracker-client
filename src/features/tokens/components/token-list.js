import { compose } from 'recompose';
import PropTypes from 'prop-types';
import React from 'react';

import { TIME_PERIOD } from '../../../constants';
import LoadingIndicator from '../../../components/loading-indicator';
import Paginator from '../../../components/paginator';
import prettyPeriod from '../../../util/pretty-period';
import sharedPropTypes from '../../../prop-types';
import tokensPropTypes from '../prop-types';
import withConversionRate from '../../currencies/components/with-conversion-rate';
import TokenListItem from './token-list-item';

const DEFAULT_PERIOD = TIME_PERIOD.DAY;

const TokenList = ({
  loading,
  onPageChange,
  page,
  pageCount,
  pageSize,
  period,
  recordCount,
  tokens,
}) => {
  if (loading) {
    return <LoadingIndicator centered />;
  }

  const offset = (page - 1) * pageSize + 1;

  return (
    <>
      <table className="table table-responsive">
        <thead>
          <tr>
            <th>#</th>
            <th colSpan="2">Token</th>
            <th css="text-align: right;">Last Price</th>
            <th css="text-align: right;">Trades ({prettyPeriod(period)})</th>
            <th css="text-align: right;">Volume ({prettyPeriod(period)})</th>
          </tr>
        </thead>
        <tbody>
          {tokens.map((token, index) => (
            <TokenListItem
              key={token.address}
              period
              position={index + offset}
              token={token}
            />
          ))}
        </tbody>
      </table>
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

TokenList.propTypes = {
  loading: PropTypes.bool,
  onPageChange: PropTypes.func.isRequired,
  page: PropTypes.number.isRequired,
  pageCount: PropTypes.number.isRequired,
  pageSize: PropTypes.number.isRequired,
  period: sharedPropTypes.timePeriod,
  recordCount: PropTypes.number.isRequired,
  tokens: PropTypes.arrayOf(tokensPropTypes.tokenWithStats),
};

TokenList.defaultProps = {
  loading: false,
  period: DEFAULT_PERIOD,
  tokens: undefined,
};

const enhance = compose(withConversionRate);

export default enhance(TokenList);

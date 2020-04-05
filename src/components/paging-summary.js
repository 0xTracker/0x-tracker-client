import _ from 'lodash';
import numeral from 'numeral';
import PropTypes from 'prop-types';
import React from 'react';

const formatNumber = (value) => numeral(value).format('0,0');

const PagingSummary = ({ className, compact, page, pageSize, recordCount }) => {
  const endIndex = _.clamp(page * pageSize, recordCount);
  const startIndex = _.clamp(endIndex - pageSize + 1, 1, Infinity);

  return (
    <p className={className} css="margin: 0;">
      {compact ? '' : 'Displaying '}
      {formatNumber(startIndex)} to {formatNumber(endIndex)} of{' '}
      {formatNumber(recordCount)}
    </p>
  );
};

PagingSummary.propTypes = {
  className: PropTypes.string,
  compact: PropTypes.bool,
  page: PropTypes.number.isRequired,
  pageSize: PropTypes.number.isRequired,
  recordCount: PropTypes.number.isRequired,
};

PagingSummary.defaultProps = {
  className: undefined,
  compact: false,
};

export default PagingSummary;

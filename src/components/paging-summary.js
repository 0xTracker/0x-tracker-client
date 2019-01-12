import _ from 'lodash';
import numeral from 'numeral';
import PropTypes from 'prop-types';
import React from 'react';

const formatNumber = value => numeral(value).format('0,0');

const PagingSummary = ({ className, page, pageSize, recordType, total }) => {
  const endIndex = _.clamp(page * pageSize, total);
  const startIndex = _.clamp(endIndex - pageSize + 1, 1, Infinity);

  return (
    <p className={className} css="margin: 0;">
      Displaying {formatNumber(startIndex)} to {formatNumber(endIndex)} of{' '}
      {formatNumber(total)} {recordType}
    </p>
  );
};

PagingSummary.propTypes = {
  className: PropTypes.string,
  page: PropTypes.number.isRequired,
  pageSize: PropTypes.number.isRequired,
  recordType: PropTypes.string.isRequired,
  total: PropTypes.number.isRequired,
};

PagingSummary.defaultProps = {
  className: undefined,
};

export default PagingSummary;

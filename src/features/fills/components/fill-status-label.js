import _ from 'lodash';
import PropTypes from 'prop-types';
import React from 'react';

const FillStatusLabel = ({ status }) => {
  const className = {
    failed: 'badge-danger',
    pending: 'badge-warning',
    successful: 'badge-success',
  }[status];

  return <span className={`badge ${className}`}>{_.startCase(status)}</span>;
};

FillStatusLabel.propTypes = {
  status: PropTypes.string.isRequired,
};

export default FillStatusLabel;

import PropTypes from 'prop-types';
import React from 'react';

import fillsPropTypes from '../prop-types';
import RecentFillsItem from './recent-fills-item';

const RecentFillsList = ({ fills }) => (
  <div css="overflow-x: scroll">
    {fills.map((fill) => (
      <RecentFillsItem fill={fill} key={fill.id} />
    ))}
  </div>
);

RecentFillsList.propTypes = {
  fills: PropTypes.arrayOf(fillsPropTypes.partialFill).isRequired,
};

export default RecentFillsList;

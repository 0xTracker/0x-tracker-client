import PropTypes from 'prop-types';
import React from 'react';

import EntityList from '../../../components/entity-list';
import fillsPropTypes from '../prop-types';
import RecentFillsItem from './recent-fills-item';

const RecentFillsList = ({ fills }) => (
  <EntityList>
    {fills.map((fill, index) => (
      <RecentFillsItem fill={fill} index={index} key={fill.id} />
    ))}
  </EntityList>
);

RecentFillsList.propTypes = {
  fills: PropTypes.arrayOf(fillsPropTypes.partialFill).isRequired,
};

export default RecentFillsList;

import PropTypes from 'prop-types';
import React from 'react';
import styled from 'styled-components';

import fillsPropTypes from '../prop-types';
import RecentFillsItem from './recent-fills-item';

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  overflow-x: scroll;
`;

const RecentFillsList = ({ fills }) => (
  <Wrapper>
    {fills.map((fill, index) => (
      <RecentFillsItem fill={fill} index={index} key={fill.id} />
    ))}
  </Wrapper>
);

RecentFillsList.propTypes = {
  fills: PropTypes.arrayOf(fillsPropTypes.partialFill).isRequired,
};

export default RecentFillsList;

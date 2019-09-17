import PropTypes from 'prop-types';
import React from 'react';
import styled from 'styled-components';

import { colors } from '../../../styles/constants';
import Number from '../../../components/number';

const EmptyValue = styled.span`
  color: ${colors.mischka};
`;

const TraderFillCountLabel = ({ children }) => {
  if (children === 0) {
    return <EmptyValue>none</EmptyValue>;
  }

  return <Number>{children}</Number>;
};

TraderFillCountLabel.propTypes = {
  children: PropTypes.number.isRequired,
};

export default TraderFillCountLabel;

import PropTypes from 'prop-types';
import React from 'react';
import styled from 'styled-components';

import { colors } from '../../../styles/constants';
import LocalisedAmount from '../../currencies/components/localised-amount';

const EmptyValue = styled.span`
  color: ${colors.mischka};
`;

const TraderVolumeLabel = ({ value }) => {
  if (value === 0) {
    return <EmptyValue>none</EmptyValue>;
  }

  return <LocalisedAmount amount={value} />;
};

TraderVolumeLabel.propTypes = {
  value: PropTypes.number.isRequired,
};

export default TraderVolumeLabel;

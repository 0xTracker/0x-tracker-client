import PropTypes from 'prop-types';
import React from 'react';
import styled from 'styled-components';

import { COLORS } from '../../../styles/constants';
import LocalisedAmount from '../../currencies/components/localised-amount';

const EmptyValue = styled.span`
  color: ${COLORS.NEUTRAL.MYSTIC_400};
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

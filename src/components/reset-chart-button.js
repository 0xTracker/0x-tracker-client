import PropTypes from 'prop-types';
import React from 'react';
import styled from 'styled-components';

import { ResetIcon } from './icons';
import { colors } from '../styles/constants';

const Button = styled.button`
  align-items: center;
  border: none;
  background: ${colors.athensGray};
  color: ${colors.violet};
  display: flex;
  padding: 0.25rem 0.5rem;
  text-transform: uppercase;
  font-size: 0.9rem;
`;

const ResetChartButton = ({ className, onClick }) => (
  <Button className={className} onClick={onClick} type="button">
    <ResetIcon css="margin-right: 0.3rem;" height={12} width={12} />
    Reset
  </Button>
);

ResetChartButton.propTypes = {
  className: PropTypes.string,
  onClick: PropTypes.func,
};

ResetChartButton.defaultProps = {
  className: undefined,
  onClick: undefined,
};

export default ResetChartButton;

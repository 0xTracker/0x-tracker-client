import PropTypes from 'prop-types';
import React from 'react';
import styled from 'styled-components';

import { ResetIcon } from './icons';
import { COLORS } from '../styles/constants';

const Button = styled.button`
  align-items: center;
  border: none;
  background: ${COLORS.PRIMARY.SCAMPI_600};
  border-radius: 0.25rem;
  color: white;
  display: flex;
  padding: 0.25rem 0.5rem;
  text-transform: uppercase;
  font-size: 0.8rem;
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

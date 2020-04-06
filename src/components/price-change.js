import numeral from 'numeral';
import PropTypes from 'prop-types';
import React from 'react';

import { colors } from '../styles/constants';
import { TrendingDownIcon, TrendingUpIcon } from './icons';

const PriceChange = ({ children }) => (
  <span
    css={`
      color: ${children > 0 ? colors.fruitSalad : colors.pomegranate};
      margin-left: 0.5rem;
      font-size: 1rem;
    `}
  >
    {numeral(children).format('0.[00]')}%
    {children > 0 ? (
      <TrendingUpIcon
        color={colors.fruitSalad}
        css="margin: 0 0 0 0.25rem;"
        height={20}
        width={20}
      />
    ) : null}
    {children < 0 ? (
      <TrendingDownIcon
        color={colors.pomegranate}
        css="margin: 0 0 0 0.25rem;"
        height={20}
        width={20}
      />
    ) : null}
  </span>
);

PriceChange.propTypes = {
  children: PropTypes.number.isRequired,
};

export default PriceChange;

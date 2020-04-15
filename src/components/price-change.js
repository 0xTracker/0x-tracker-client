import numeral from 'numeral';
import PropTypes from 'prop-types';
import React from 'react';

import { colors } from '../styles/constants';
import { TrendingDownIcon, TrendingFlatIcon, TrendingUpIcon } from './icons';

const getColor = (value) => {
  if (value > 0) {
    return colors.fruitSalad;
  }

  if (value < 0) {
    return colors.pomegranate;
  }

  return colors.stormGray;
};

const PriceChange = ({ children, className }) => (
  <span
    className={className}
    css={`
      color: ${getColor(children)};
      margin-left: 0.5rem;
      font-size: 1rem;
    `}
  >
    {numeral(children).format('0.[00]')}%
    {children === 0 ? (
      <TrendingFlatIcon
        color={colors.stormGray}
        css="margin: 0 0 0 0.25rem;"
        height={20}
        width={20}
      />
    ) : null}
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
  className: PropTypes.string, // eslint-disable-line react/require-default-props
};

export default PriceChange;

import numeral from 'numeral';
import PropTypes from 'prop-types';
import React from 'react';

import { COLORS } from '../styles/constants';
import { TrendingDownIcon, TrendingFlatIcon, TrendingUpIcon } from './icons';

const getColor = (value) => {
  if (value > 0) {
    return COLORS.ACCENT.FRUIT_SALAD_500;
  }

  if (value < 0) {
    return COLORS.ACCENT.POMEGRANATE_500;
  }

  return COLORS.NEUTRAL.MYSTIC_600;
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
        color="currentColor"
        css="margin: 0 0 0 0.25rem;"
        height={20}
        width={20}
      />
    ) : null}
    {children > 0 ? (
      <TrendingUpIcon
        color="currentColor"
        css="margin: 0 0 0 0.25rem;"
        height={20}
        width={20}
      />
    ) : null}
    {children < 0 ? (
      <TrendingDownIcon
        color="currentColor"
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

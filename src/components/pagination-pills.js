import { css } from 'styled-components';
import PropTypes from 'prop-types';
import React from 'react';

import { COLORS } from '../styles/constants';
import { ChevronLeftIcon, ChevronRightIcon } from './icons';
import Pill from './pill';

const enabledCss = css`
  display: inline-block;
  margin-right: 0.25rem;

  &:last-child {
    margin: 0;
  }
`;

const disabledCss = css`
  background-color: ${COLORS.NEUTRAL.MYSTIC_300};
  color: ${COLORS.NEUTRAL.MYSTIC_500};
  cursor: not-allowed;
  display: inline-block;
  margin-right: 0.25rem;

  &:hover {
    background-color: ${COLORS.NEUTRAL.MYSTIC_300};
    color: ${COLORS.NEUTRAL.MYSTIC_500};
  }

  &:last-child {
    margin: 0;
  }
`;

const PaginationPills = ({ onPageChange, page, pageCount }) => {
  const disabled = pageCount === undefined;

  return (
    <div>
      <Pill
        as="button"
        css={page === 1 || disabled ? disabledCss : enabledCss}
        disabled={page === 1 || disabled}
        onClick={() => {
          if (page !== 1 && !disabled) {
            onPageChange(page - 1);
          }
        }}
      >
        <ChevronLeftIcon size={10} />
      </Pill>
      <Pill
        as="button"
        css={page === pageCount || disabled ? disabledCss : enabledCss}
        disabled={page === pageCount || disabled}
        onClick={() => {
          if (page !== pageCount && !disabled) {
            onPageChange(page + 1);
          }
        }}
      >
        <ChevronRightIcon size={10} />
      </Pill>
    </div>
  );
};

PaginationPills.propTypes = {
  onPageChange: PropTypes.func.isRequired,
  page: PropTypes.number.isRequired,
  pageCount: PropTypes.number,
};

PaginationPills.defaultProps = {
  pageCount: undefined,
};

export default PaginationPills;

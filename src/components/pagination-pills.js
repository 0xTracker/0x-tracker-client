import { css } from 'styled-components';
import PropTypes from 'prop-types';
import React from 'react';

import { colors } from '../styles/constants';
import { ChevronLeftIcon, ChevronRightIcon } from './icons';
import Pill from './pill';

const enabledCss = css`
  margin-right: 0.25rem;
`;

const disabledCss = css`
  color: ${colors.spunPearl};
  cursor: not-allowed;
  display: inline-block;
  margin-right: 0.25rem;

  &:hover {
    background-color: ${colors.athensGrayer};
    color: ${colors.spunPearl};
  }

  &:last-child {
    margin: 0;
  }
`;

const PaginationPills = ({ onPageChange, page, pageCount }) => (
  <div>
    <Pill
      as="button"
      css={page === 1 ? disabledCss : enabledCss}
      disabled={page === 1}
      onClick={() => {
        if (page !== 1) {
          onPageChange(page - 1);
        }
      }}
    >
      <ChevronLeftIcon size={10} />
    </Pill>
    <Pill
      as="button"
      css={page === pageCount ? disabledCss : enabledCss}
      disabled={page === pageCount}
      onClick={() => {
        if (page !== pageCount) {
          onPageChange(page + 1);
        }
      }}
    >
      <ChevronRightIcon size={10} />
    </Pill>
  </div>
);

PaginationPills.propTypes = {
  onPageChange: PropTypes.func.isRequired,
  page: PropTypes.number.isRequired,
  pageCount: PropTypes.number.isRequired,
};

export default PaginationPills;

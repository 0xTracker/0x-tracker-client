import PropTypes from 'prop-types';
import React from 'react';
import styled from 'styled-components';

import { COLORS } from '../styles/constants';
import { LeftArrowIcon, RightArrowIcon } from './icons';
import LoadingIndicator from './loading-indicator';
import PagingSummary from './paging-summary';

const StyledMobilePaginator = styled.div`
  align-items: center;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

const PageButton = styled.button.attrs({ type: 'button' })`
  border: none;
  background: none;
  color: ${COLORS.NEUTRAL.MYSTIC_700};
  cursor: pointer;
  flex-grow: 0;
  padding: 1rem 1.25rem;

  &:hover,
  &:active {
    color: inherit;
  }

  &:disabled {
    color: ${COLORS.NEUTRAL.MYSTIC_400};

    &:hover {
      background: none;
      cursor: initial;
    }
  }
`;

const PageInfo = styled.div`
  display: flex;
  justify-content: center;
`;

const MobilePaginator = ({
  changingPage,
  onPageChange,
  page,
  pageCount,
  pageSize,
  recordCount,
}) => (
  <StyledMobilePaginator>
    <PageButton disabled={page === 1} onClick={() => onPageChange(page - 1)}>
      <LeftArrowIcon width={12} />
    </PageButton>
    <PageInfo>
      {changingPage ? (
        <LoadingIndicator size="medium" type="cylon" />
      ) : (
        <PagingSummary
          compact
          css="font-weight: 500;"
          page={page}
          pageCount={page}
          pageSize={pageSize}
          recordCount={recordCount}
        />
      )}
    </PageInfo>
    <PageButton
      disabled={page === pageCount}
      onClick={() => onPageChange(page + 1)}
    >
      <RightArrowIcon width={12} />
    </PageButton>
  </StyledMobilePaginator>
);

MobilePaginator.propTypes = {
  changingPage: PropTypes.bool,
  onPageChange: PropTypes.func.isRequired,
  page: PropTypes.number.isRequired,
  pageCount: PropTypes.number.isRequired,
  pageSize: PropTypes.number.isRequired,
  recordCount: PropTypes.number.isRequired,
};

MobilePaginator.defaultProps = {
  changingPage: false,
};

export default MobilePaginator;

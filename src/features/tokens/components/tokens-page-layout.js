import PropTypes from 'prop-types';
import React from 'react';

import { TIME_PERIOD } from '../../../constants';
import { useMetadata } from '../../../hooks';
import Card from '../../../components/card';
import PageLayout from '../../../components/page-layout';
import SubTitle from '../../../components/sub-title';
import TokensFilter from './tokens-filter';

const periodDescriptions = {
  [TIME_PERIOD.DAY]: 'from the past 24 hours',
  [TIME_PERIOD.WEEK]: 'from the past week',
  [TIME_PERIOD.MONTH]: 'from the past 30 days',
  [TIME_PERIOD.YEAR]: 'from the past year',
  [TIME_PERIOD.ALL]: 'from all time',
};

const TokensPageLayout = ({
  children,
  defaultFilters,
  onFiltersChange,
  selectedFilters,
}) => {
  useMetadata({ title: 'Ethereum Token Prices & 0x Protocol Metrics' });

  return (
    <PageLayout
      filter={
        <TokensFilter
          defaultFilters={defaultFilters}
          onChange={onFiltersChange}
          selectedFilters={selectedFilters}
        />
      }
      title={
        <span>
          Traded Tokens
          <SubTitle>{periodDescriptions[selectedFilters.statsPeriod]}</SubTitle>
        </span>
      }
    >
      <Card>{children}</Card>
    </PageLayout>
  );
};

TokensPageLayout.propTypes = {
  children: PropTypes.node.isRequired,
  defaultFilters: PropTypes.shape({
    statsPeriod: PropTypes.string,
    type: PropTypes.string,
  }).isRequired,
  onFiltersChange: PropTypes.func.isRequired,
  selectedFilters: PropTypes.shape({
    statsPeriod: PropTypes.string,
    type: PropTypes.string,
  }).isRequired,
};

export default TokensPageLayout;

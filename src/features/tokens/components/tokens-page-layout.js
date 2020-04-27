import PropTypes from 'prop-types';
import React from 'react';

import { TIME_PERIOD } from '../../../constants';
import { useMetadata } from '../../../hooks';
import Card from '../../../components/card';
import Hidden from '../../../components/hidden';
import PageLayout from '../../../components/page-layout';
import SubTitle from '../../../components/sub-title';
import TokensFilter from './tokens-filter';

const periodDescriptions = {
  [TIME_PERIOD.DAY]: 'in the last 24 hours',
  [TIME_PERIOD.WEEK]: 'in the last week',
  [TIME_PERIOD.MONTH]: 'in the last month',
  [TIME_PERIOD.YEAR]: 'in the last year',
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
          <Hidden above="xs">
            <SubTitle>
              {periodDescriptions[selectedFilters.statsPeriod]}
            </SubTitle>
          </Hidden>
        </span>
      }
    >
      <Card fullHeight>{children}</Card>
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

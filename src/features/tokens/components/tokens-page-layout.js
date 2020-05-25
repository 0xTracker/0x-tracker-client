import PropTypes from 'prop-types';
import React from 'react';

import { TIME_PERIOD } from '../../../constants';
import { useMetadata } from '../../../hooks';
import { TokensIcon } from '../../../components/icons';
import Card from '../../../components/card';
import PageLayout from '../../../components/page-layout';
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
      actions={
        <TokensFilter
          defaultFilters={defaultFilters}
          onChange={onFiltersChange}
          selectedFilters={selectedFilters}
        />
      }
      icon={<TokensIcon size={44} />}
      subTitle={periodDescriptions[selectedFilters.statsPeriod]}
      title="Traded Tokens"
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

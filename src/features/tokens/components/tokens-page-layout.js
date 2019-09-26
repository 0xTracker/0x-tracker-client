import { Helmet } from 'react-helmet';
import PropTypes from 'prop-types';
import React from 'react';

import Card from '../../../components/card';
import PageLayout from '../../../components/page-layout';
import TokensFilter from './tokens-filter';

const TokensPageLayout = ({
  children,
  defaultFilters,
  onFiltersChange,
  selectedFilters,
}) => (
  <>
    <Helmet>
      <title>Traded Tokens</title>
    </Helmet>
    <PageLayout
      filter={
        <TokensFilter
          defaultFilters={defaultFilters}
          onChange={onFiltersChange}
          selectedFilters={selectedFilters}
        />
      }
      title="Traded Tokens"
    >
      <Card fullHeight>{children}</Card>
    </PageLayout>
  </>
);

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

import { Helmet } from 'react-helmet';
import PropTypes from 'prop-types';
import React from 'react';

import { colors } from '../../../styles/constants';
import { TIME_PERIOD } from '../../../constants';
import Card from '../../../components/card';
import Hidden from '../../../components/hidden';
import PageLayout from '../../../components/page-layout';
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
      title={
        <span>
          Traded Tokens
          <Hidden above="xs">
            <small
              css={`
                color: ${colors.stormGray};
                display: block;
                font-size: 0.9rem;
                text-transform: lowercase;
              `}
            >
              {periodDescriptions[selectedFilters.statsPeriod]}
            </small>
          </Hidden>
        </span>
      }
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

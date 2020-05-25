import PropTypes from 'prop-types';
import React from 'react';

import { useMetadata } from '../../../hooks';
import { TokensIcon } from '../../../components/icons';
import { getPeriodDescriptor } from '../../../util';
import PageLayout from '../../../components/page-layout';
import TokensFilter from './tokens-filter';

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
      subTitle={getPeriodDescriptor(selectedFilters.statsPeriod)}
      title="Traded Tokens"
    >
      {children}
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

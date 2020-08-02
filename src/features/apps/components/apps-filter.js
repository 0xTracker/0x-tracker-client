import PropTypes from 'prop-types';
import React from 'react';

import AppCategoryFilter from './app-category-filter';
import sharedPropTypes from '../../../prop-types';
import MobileTimePeriodFilter from '../../../components/mobile-time-period-filter';

const AppsFilter = ({ onChange, selectedFilters }) => (
  <div css="display: flex; justify-content: flex-end; width: 100%;">
    <AppCategoryFilter
      css="margin-right: 12px;"
      onChange={(newCategory) => {
        onChange({ ...selectedFilters, category: newCategory });
      }}
      value={selectedFilters.category}
    />
    <MobileTimePeriodFilter
      onChange={(newPeriod) => {
        onChange({ ...selectedFilters, statsPeriod: newPeriod });
      }}
      value={selectedFilters.statsPeriod}
    />
  </div>
);

AppsFilter.propTypes = {
  onChange: PropTypes.func.isRequired,
  selectedFilters: PropTypes.shape({
    category: PropTypes.string.isRequired,
    statsPeriod: sharedPropTypes.timePeriod.isRequired,
  }).isRequired,
};

export default AppsFilter;

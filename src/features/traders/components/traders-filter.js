import PropTypes from 'prop-types';
import React from 'react';

import AsyncTimePeriodSelector from '../../../components/async-time-period-selector';
import FilterButton from '../../../components/filter-button';
import sharedPropTypes from '../../../prop-types';
import TradersFilterDialog from './traders-filter-dialog';

const TradersFilter = ({ onChange, selectedFilters }) => {
  const [filtersDialogVisible, setFiltersDialogVisible] = React.useState(false);

  return (
    <div css="display: flex; width: 100%;">
      {filtersDialogVisible ? (
        <TradersFilterDialog
          onClose={() => setFiltersDialogVisible(false)}
          onSubmit={newValues => {
            onChange({ ...selectedFilters, ...newValues });
            setFiltersDialogVisible(false);
          }}
        />
      ) : null}
      <AsyncTimePeriodSelector
        css="width: 100%;"
        defaultValue={selectedFilters.statsPeriod}
        onChange={newPeriod => {
          onChange({ ...selectedFilters, statsPeriod: newPeriod });
        }}
      />
      <FilterButton
        css="margin-left: 0.5rem; flex-shrink: 0; flex-basis: 38px;"
        onClick={() => setFiltersDialogVisible(true)}
        title="Show additional filters"
      />
    </div>
  );
};

TradersFilter.propTypes = {
  onChange: PropTypes.func.isRequired,
  selectedFilters: PropTypes.shape({
    statsPeriod: sharedPropTypes.timePeriod.isRequired,
  }).isRequired,
};

export default TradersFilter;

import _ from 'lodash';
import PropTypes from 'prop-types';
import React from 'react';

import FilterButton from '../../../components/filter-button';
import sharedPropTypes from '../../../prop-types';
import TimePeriodSelector from '../../../components/time-period-selector';
import TradersFilterDialog from './traders-filter-dialog';

const TradersFilter = ({ onChange, selectedFilters }) => {
  const [filtersDialogVisible, setFiltersDialogVisible] = React.useState(false);
  const additionalFilters = _.omit(selectedFilters, 'statsPeriod');

  return (
    <div css="display: flex; width: 100%;">
      {filtersDialogVisible ? (
        <TradersFilterDialog
          onClose={() => setFiltersDialogVisible(false)}
          onSubmit={newValues => {
            onChange({ ...selectedFilters, ...newValues });
            setFiltersDialogVisible(false);
          }}
          selectedFilters={additionalFilters}
        />
      ) : null}
      <TimePeriodSelector
        css="width: 100%;"
        defaultValue={selectedFilters.statsPeriod}
        onChange={newPeriod => {
          onChange({ ...selectedFilters, statsPeriod: newPeriod });
        }}
      />
      <FilterButton
        appliedFilterCount={Object.keys(additionalFilters).length}
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

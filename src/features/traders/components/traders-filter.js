import _ from 'lodash';
import PropTypes from 'prop-types';
import React from 'react';

import FilterButton from '../../../components/filter-button';
import sharedPropTypes from '../../../prop-types';
import TimePeriodSelector from '../../../components/time-period-selector';
import TradersFilterDialog from './traders-filter-dialog';
import tradersPropTypes from '../prop-types';

const hasAdditionalFilters = (defaultValues, selectedValues) =>
  _.isEqual(
    _.omit(defaultValues, 'statsPeriod'),
    _.omit(selectedValues, 'statsPeriod'),
  );

const TradersFilter = ({ defaultFilters, onChange, selectedFilters }) => {
  const [filtersDialogVisible, setFiltersDialogVisible] = React.useState(false);

  return (
    <div css="display: flex; width: 100%;">
      {filtersDialogVisible ? (
        <TradersFilterDialog
          currentValues={selectedFilters}
          defaultValues={defaultFilters}
          onClose={() => setFiltersDialogVisible(false)}
          onSubmit={newValues => {
            onChange({ ...selectedFilters, ...newValues });
            setFiltersDialogVisible(false);
          }}
        />
      ) : null}
      <TimePeriodSelector
        css="width: 100%;"
        onChange={newPeriod => {
          onChange({ ...selectedFilters, statsPeriod: newPeriod });
        }}
        value={selectedFilters.statsPeriod}
      />
      <FilterButton
        appliedFilterCount={
          hasAdditionalFilters(defaultFilters, selectedFilters) ? 0 : 1
        }
        css="margin-left: 0.5rem; flex-shrink: 0; flex-basis: 38px;"
        onClick={() => setFiltersDialogVisible(true)}
        title="Show additional filters"
      />
    </div>
  );
};

TradersFilter.propTypes = {
  defaultFilters: PropTypes.shape({
    statsPeriod: sharedPropTypes.timePeriod.isRequired,
    type: tradersPropTypes.traderType,
  }).isRequired,
  onChange: PropTypes.func.isRequired,
  selectedFilters: PropTypes.shape({
    statsPeriod: sharedPropTypes.timePeriod.isRequired,
    type: tradersPropTypes.traderType,
  }).isRequired,
};

export default TradersFilter;

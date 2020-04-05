import _ from 'lodash';
import PropTypes from 'prop-types';
import React from 'react';

import FilterButton from '../../../components/filter-button';
import Hidden from '../../../components/hidden';
import sharedPropTypes from '../../../prop-types';
import TimePeriodFilter from '../../../components/time-period-filter';
import RelayersFilterDialog from './relayers-filter-dialog';
import Visible from '../../../components/visible';

const getAdditionalFilterCount = (defaultValues, selectedValues) => {
  const intersection = _.omitBy(
    selectedValues,
    (value, key) => key === 'statsPeriod' || defaultValues[key] === value,
  );

  return Object.keys(intersection).length;
};

const RelayersFilter = ({ defaultFilters, onChange, selectedFilters }) => {
  const [filtersDialogVisible, setFiltersDialogVisible] = React.useState(false);

  return (
    <div css="display: flex; justify-content: flex-end; width: 100%;">
      {filtersDialogVisible ? (
        <RelayersFilterDialog
          currentValues={selectedFilters}
          defaultValues={defaultFilters}
          onClose={() => setFiltersDialogVisible(false)}
          onSubmit={(newValues) => {
            onChange({ ...selectedFilters, ...newValues });
            setFiltersDialogVisible(false);
          }}
        />
      ) : null}
      <Visible above="xs">
        <TimePeriodFilter
          css="width: 200px;"
          onChange={(newPeriod) => {
            onChange({ ...selectedFilters, statsPeriod: newPeriod });
          }}
          value={selectedFilters.statsPeriod}
        />
      </Visible>
      <Hidden above="xs">
        <FilterButton
          css="margin-left: 0.5rem;"
          indicatorValue={getAdditionalFilterCount(
            defaultFilters,
            selectedFilters,
          )}
          onClick={() => setFiltersDialogVisible(true)}
          title="Show filters"
        />
      </Hidden>
    </div>
  );
};

RelayersFilter.propTypes = {
  defaultFilters: PropTypes.shape({
    statsPeriod: sharedPropTypes.timePeriod.isRequired,
  }).isRequired,
  onChange: PropTypes.func.isRequired,
  selectedFilters: PropTypes.shape({
    statsPeriod: sharedPropTypes.timePeriod.isRequired,
  }).isRequired,
};

export default RelayersFilter;

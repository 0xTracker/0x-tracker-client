import _ from 'lodash';
import PropTypes from 'prop-types';
import React from 'react';

import FilterButton from '../../../components/filter-button';
import sharedPropTypes from '../../../prop-types';
import MobileTimePeriodFilter from '../../../components/mobile-time-period-filter';
import TradersFilterDialog from './traders-filter-dialog';
import tradersPropTypes from '../prop-types';
import Visible from '../../../components/visible';
import TraderTypeFilter from './trader-type-filter';

const getAdditionalFilterCount = (defaultValues, selectedValues) => {
  const intersection = _.omitBy(
    selectedValues,
    (value, key) => key === 'statsPeriod' || defaultValues[key] === value,
  );

  return Object.keys(intersection).length;
};

const TradersFilter = ({ defaultFilters, onChange, selectedFilters }) => {
  const [filtersDialogVisible, setFiltersDialogVisible] = React.useState(false);

  return (
    <div css="display: flex; justify-content: flex-end; width: 100%;">
      {filtersDialogVisible ? (
        <TradersFilterDialog
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
        <TraderTypeFilter
          css="margin-right: 12px;"
          onChange={(newType) => {
            onChange({ ...selectedFilters, type: newType });
          }}
          value={selectedFilters.type}
        />
      </Visible>
      <Visible at={['xs']}>
        <FilterButton
          css="margin-right: 12px;"
          indicatorValue={getAdditionalFilterCount(
            defaultFilters,
            selectedFilters,
          )}
          onClick={() => setFiltersDialogVisible(true)}
          title="Show additional filters"
        />
      </Visible>
      <MobileTimePeriodFilter
        onChange={(newPeriod) => {
          onChange({ ...selectedFilters, statsPeriod: newPeriod });
        }}
        value={selectedFilters.statsPeriod}
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

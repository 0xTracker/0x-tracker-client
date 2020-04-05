import _ from 'lodash';
import PropTypes from 'prop-types';
import React from 'react';

import FilterButton from '../../../components/filter-button';
import sharedPropTypes from '../../../prop-types';
import TimePeriodFilter from '../../../components/time-period-filter';
import TokensFilterDialog from './tokens-filter-dialog';
import tokensPropTypes from '../prop-types';
import Visible from '../../../components/visible';

const getAdditionalFilterCount = (defaultValues, selectedValues) => {
  const intersection = _.omitBy(
    selectedValues,
    (value, key) => key === 'statsPeriod' || defaultValues[key] === value,
  );

  return Object.keys(intersection).length;
};

const TokensFilter = ({ defaultFilters, onChange, selectedFilters }) => {
  const [filtersDialogVisible, setFiltersDialogVisible] = React.useState(false);

  return (
    <div css="display: flex; justify-content: flex-end; width: 100%;">
      {filtersDialogVisible ? (
        <TokensFilterDialog
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
      <FilterButton
        css="margin-left: 0.5rem;"
        indicatorValue={getAdditionalFilterCount(
          defaultFilters,
          selectedFilters,
        )}
        onClick={() => setFiltersDialogVisible(true)}
        title="Show additional filters"
      />
    </div>
  );
};

TokensFilter.propTypes = {
  defaultFilters: PropTypes.shape({
    statsPeriod: sharedPropTypes.timePeriod.isRequired,
    type: tokensPropTypes.tokenType,
  }).isRequired,
  onChange: PropTypes.func.isRequired,
  selectedFilters: PropTypes.shape({
    statsPeriod: sharedPropTypes.timePeriod.isRequired,
    type: tokensPropTypes.tokenType,
  }).isRequired,
};

export default TokensFilter;

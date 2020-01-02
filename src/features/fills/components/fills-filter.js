import _ from 'lodash';
import PropTypes from 'prop-types';
import React from 'react';

import FilterButton from '../../../components/filter-button';
import FillsFilterDialog from './fills-filter-dialog';

const getAdditionalFilterCount = (defaultValues, selectedValues) => {
  const intersection = _.omitBy(
    selectedValues,
    (value, key) => defaultValues[key] === value,
  );

  return Object.keys(intersection).length;
};

const FillsFilter = ({ defaultFilters, onChange, selectedFilters }) => {
  const [filtersDialogVisible, setFiltersDialogVisible] = React.useState(false);

  return (
    <div css="display: flex; width: 100%; justify-content: flex-end;">
      {filtersDialogVisible ? (
        <FillsFilterDialog
          currentValues={selectedFilters}
          defaultValues={defaultFilters}
          onClose={() => setFiltersDialogVisible(false)}
          onSubmit={newValues => {
            onChange({ ...selectedFilters, ...newValues });
            setFiltersDialogVisible(false);
          }}
        />
      ) : null}
      <FilterButton
        css="margin-left: 0.5rem; flex-shrink: 0; flex-basis: 36px; height: 36px;"
        indicatorValue={getAdditionalFilterCount(
          defaultFilters,
          selectedFilters,
        )}
        onClick={() => setFiltersDialogVisible(true)}
        title="Show filters"
      />
    </div>
  );
};

FillsFilter.propTypes = {
  defaultFilters: PropTypes.shape({
    protocolVersion: PropTypes.number,
    relayer: PropTypes.number,
    status: PropTypes.string,
    valueFrom: PropTypes.number,
    valueTo: PropTypes.number,
  }).isRequired,
  onChange: PropTypes.func.isRequired,
  selectedFilters: PropTypes.shape({
    protocolVersion: PropTypes.number,
    relayer: PropTypes.number,
    status: PropTypes.string,
    valueFrom: PropTypes.number,
    valueTo: PropTypes.number,
  }).isRequired,
};

export default FillsFilter;

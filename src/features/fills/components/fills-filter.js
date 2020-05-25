import _ from 'lodash';
import PropTypes from 'prop-types';
import React from 'react';

import FilterButton from '../../../components/filter-button';
import FillsFilterDialog from './fills-filter-dialog';
import { useCurrentBreakpoint } from '../../../responsive-utils';

const DEFAULT_FILTERS = {
  dateFrom: undefined,
  dateTo: undefined,
  protocolVersion: undefined,
  relayer: undefined,
  status: undefined,
  token: undefined,
  trader: undefined,
  valueFrom: undefined,
  valueTo: undefined,
};

const getAdditionalFilterCount = (defaultValues, selectedValues) => {
  const intersection = _.omitBy(
    selectedValues,
    (value, key) => defaultValues[key] === value,
  );

  return Object.keys(intersection).length;
};

const FillsFilter = ({ onChange, selectedFilters }) => {
  const breakpoint = useCurrentBreakpoint();
  const [filtersDialogVisible, setFiltersDialogVisible] = React.useState(false);

  return (
    <div css="display: flex; width: 100%; justify-content: flex-end;">
      {filtersDialogVisible ? (
        <FillsFilterDialog
          currentValues={selectedFilters}
          defaultValues={DEFAULT_FILTERS}
          onClose={() => setFiltersDialogVisible(false)}
          onSubmit={(newValues) => {
            onChange({ ...selectedFilters, ...newValues });
            setFiltersDialogVisible(false);
          }}
        />
      ) : null}
      <FilterButton
        compact={breakpoint.lessThan('sm')}
        css="margin-left: 0.5rem; flex-shrink: 0; flex-basis: 36px; height: 36px;"
        indicatorValue={getAdditionalFilterCount(
          DEFAULT_FILTERS,
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
    relayer: PropTypes.string,
    status: PropTypes.string,
    valueFrom: PropTypes.number,
    valueTo: PropTypes.number,
  }).isRequired,
  onChange: PropTypes.func.isRequired,
  selectedFilters: PropTypes.shape({
    protocolVersion: PropTypes.number,
    relayer: PropTypes.string,
    status: PropTypes.string,
    valueFrom: PropTypes.number,
    valueTo: PropTypes.number,
  }).isRequired,
};

export default FillsFilter;

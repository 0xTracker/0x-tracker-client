import _ from 'lodash';
import PropTypes from 'prop-types';
import React from 'react';

import AsyncSelect from '../../../components/async-select';
import LoadingIndicator from '../../../components/loading-indicator';
import useRelayers from '../hooks/use-relayers';

const RelayerSelector = ({ className, name, onChange, value }) => {
  const [relayers, loading] = useRelayers({ statsPeriod: 'all' });

  if (loading) {
    return <LoadingIndicator size="small" type="cylon" />;
  }

  const sortedRelayers = _.sortBy(relayers.items, 'name');

  const options = [
    {
      label: 'All',
      value: undefined,
    },
    ...sortedRelayers.map((relayer) => ({
      label: relayer.name,
      value: relayer.id,
    })),
  ];

  return (
    <AsyncSelect
      className={className}
      controlShouldRenderValue
      isClearable={false}
      isSearchable={false}
      name={name}
      onChange={(option) => onChange(option.value, name)}
      options={options}
      value={options.find((option) => option.value === value)}
    />
  );
};

RelayerSelector.propTypes = {
  className: PropTypes.string,
  name: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  value: PropTypes.string,
};

RelayerSelector.defaultProps = {
  className: undefined,
  name: undefined,
  value: undefined,
};

export default RelayerSelector;

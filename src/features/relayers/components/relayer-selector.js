import _ from 'lodash';
import PropTypes from 'prop-types';
import React from 'react';

import LoadingIndicator from '../../../components/loading-indicator';
import Select from '../../../components/select';
import useRelayers from '../hooks/use-relayers';

const RelayerSelector = ({ name, onChange, value, ...otherProps }) => {
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
    <Select
      controlShouldRenderValue
      isClearable={false}
      isSearchable={false}
      name={name}
      onChange={(option) => onChange(option.value, name)}
      options={options}
      value={options.find((option) => option.value === value)}
      {...otherProps}
    />
  );
};

RelayerSelector.propTypes = {
  name: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  value: PropTypes.string,
};

RelayerSelector.defaultProps = {
  name: undefined,
  value: undefined,
};

export default RelayerSelector;

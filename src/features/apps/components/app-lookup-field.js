import _ from 'lodash';
import PropTypes from 'prop-types';
import React from 'react';

import LoadingIndicator from '../../../components/loading-indicator';
import Select from '../../../components/select';
import useApps from '../hooks/use-apps';

const AppLookupField = ({ name, onChange, value, ...otherProps }) => {
  const [apps, loading] = useApps({ statsPeriod: 'all' });

  if (loading) {
    return <LoadingIndicator size="small" type="cylon" />;
  }

  const sortedApps = _.sortBy(apps.items, 'name');

  const options = [
    {
      label: 'All',
      value: undefined,
    },
    ...sortedApps.map((app) => ({
      label: app.name,
      value: app.id,
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

AppLookupField.propTypes = {
  name: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  value: PropTypes.string,
};

AppLookupField.defaultProps = {
  name: undefined,
  value: undefined,
};

export default AppLookupField;

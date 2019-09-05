import { useLocalStorage } from 'react-use';
import PropTypes from 'prop-types';
import React from 'react';

import { BASE_CURRENCY } from '../../currencies/constants';
import PreferencesContext from '../contexts/preferences-context';

const PreferencesProvider = ({ children }) => {
  const [displayCurrency, setDisplayCurrency] = useLocalStorage(
    'preferences.displayCurrency',
    BASE_CURRENCY,
  );

  const updatePreferences = React.useCallback(newPreferences => {
    setDisplayCurrency(newPreferences.displayCurrency);
  }, []);

  const [value, setValue] = React.useState({
    update: updatePreferences,
    values: { displayCurrency },
  });

  React.useEffect(() => {
    setValue({
      update: updatePreferences,
      values: { displayCurrency },
    });
  }, [displayCurrency]);

  return (
    <PreferencesContext.Provider value={value}>
      {children}
    </PreferencesContext.Provider>
  );
};

PreferencesProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default PreferencesProvider;

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

  const [sidebar, setSidebar] = useLocalStorage('preferences.sidebar', 'full');

  const updatePreferences = React.useCallback((newPreferences) => {
    setDisplayCurrency(newPreferences.displayCurrency);
  }, []);

  const setPreference = React.useCallback((key, value) => {
    if (key === 'sidebar') {
      setSidebar(value);
      return;
    }

    if (key === 'displayCurrency') {
      setDisplayCurrency(value);
      return;
    }

    throw new Error(`Unknown preference: ${key}`);
  }, []);

  const value = React.useMemo(
    () => ({
      set: setPreference,
      update: updatePreferences,
      values: { displayCurrency, sidebar },
    }),
    [displayCurrency, sidebar],
  );

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

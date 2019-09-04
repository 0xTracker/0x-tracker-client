import React from 'react';

import PreferencesContext from '../contexts/preferences-context';

const useDisplayCurrency = () => {
  const preferences = React.useContext(PreferencesContext);

  return preferences.displayCurrency;
};

export default useDisplayCurrency;

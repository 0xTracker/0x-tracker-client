import React from 'react';

import { BASE_CURRENCY } from '../../currencies/constants';

const PreferencesContext = React.createContext({
  displayCurrency: BASE_CURRENCY,
});

export default PreferencesContext;

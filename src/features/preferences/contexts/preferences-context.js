import _ from 'lodash';
import React from 'react';

import { BASE_CURRENCY } from '../../currencies/constants';

const PreferencesContext = React.createContext({
  update: _.noop,
  values: { displayCurrency: BASE_CURRENCY },
});

export default PreferencesContext;

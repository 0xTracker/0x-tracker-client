import _ from 'lodash';
import React from 'react';

import { BASE_CURRENCY } from '../../currencies/constants';

const PreferencesContext = React.createContext({
  set: _.noop,
  update: _.noop,
  values: { displayCurrency: BASE_CURRENCY, sidebar: 'full' },
});

export default PreferencesContext;

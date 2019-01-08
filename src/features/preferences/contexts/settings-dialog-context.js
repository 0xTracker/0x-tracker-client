import _ from 'lodash';
import React from 'react';

const SettingsDialogContext = React.createContext({
  hide: _.noop,
  show: _.noop,
  visible: false,
});

export default SettingsDialogContext;

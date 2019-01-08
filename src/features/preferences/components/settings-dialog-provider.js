import PropTypes from 'prop-types';
import React, { useState } from 'react';

import SettingsDialog from './settings-dialog';
import SettingsDialogContext from '../contexts/settings-dialog-context';

const SettingsDialogProvider = ({ children }) => {
  const [visible, setVisibility] = useState(false);

  const show = () => setVisibility(true);
  const hide = () => setVisibility(false);

  const value = { hide, show, visible };

  return (
    <SettingsDialogContext.Provider value={value}>
      {visible ? <SettingsDialog onClose={hide} onSubmit={hide} /> : null}
      {children}
    </SettingsDialogContext.Provider>
  );
};

SettingsDialogProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default SettingsDialogProvider;

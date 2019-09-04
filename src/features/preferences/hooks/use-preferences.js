import React from 'react';

import PreferencesContext from '../contexts/preferences-context';

const usePreferences = () => React.useContext(PreferencesContext);

export default usePreferences;

import { useContext } from 'react';

import SettingsDialogContext from '../contexts/settings-dialog-context';

const useSettingsDialog = () => useContext(SettingsDialogContext);

export default useSettingsDialog;

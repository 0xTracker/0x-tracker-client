import { FormGroup } from 'reactstrap';
import PropTypes from 'prop-types';
import React, { useState } from 'react';

import CurrencySelector from '../../currencies/components/currency-selector';
import Dialog from '../../../components/dialog';
import PrimaryFormButton from '../../../components/primary-form-button';
import usePreferences from '../hooks/use-preferences';
import useDisplayCurrency from '../hooks/use-display-currency';

const SettingsDialog = ({ onClose, onSubmit }) => {
  const displayCurrency = useDisplayCurrency();
  const preferences = usePreferences();

  const [selectedCurrency, setSelectedCurrency] = useState(displayCurrency);

  const handleSubmit = () => {
    preferences.update({ displayCurrency: selectedCurrency });
    onSubmit();
  };

  return (
    <Dialog height={300} onClose={onClose} title="Settings" width={450}>
      <form noValidate onSubmit={handleSubmit}>
        <FormGroup>
          <label htmlFor="displayCurrency">Display Currency</label>
          <CurrencySelector
            name="displayCurrency"
            onChange={setSelectedCurrency}
            value={selectedCurrency}
          />
        </FormGroup>
        <div css="margin-top: 2rem;">
          <PrimaryFormButton onClick={handleSubmit} type="button">
            Save
          </PrimaryFormButton>
        </div>
      </form>
    </Dialog>
  );
};

SettingsDialog.propTypes = {
  onClose: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
};

export default SettingsDialog;

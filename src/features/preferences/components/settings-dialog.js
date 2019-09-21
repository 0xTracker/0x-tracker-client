import { FormGroup } from 'reactstrap';
import PropTypes from 'prop-types';
import React, { useState } from 'react';
import styled from 'styled-components';

import { colors } from '../../../styles/constants';
import CurrencySelector from '../../currencies/components/currency-selector';
import Dialog from '../../../components/dialog';
import usePreferences from '../hooks/use-preferences';
import useDisplayCurrency from '../hooks/use-display-currency';

const FormButton = styled.button`
  background-color: ${colors.indigo};
  border: none;
  border-radius: 0.25rem;
  color: ${colors.white};
  cursor: pointer;
  padding: 0.5rem 1rem;

  &:hover,
  &:active {
    background-color: ${colors.violet};
  }
`;

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
      <form>
        <FormGroup>
          <label htmlFor="displayCurrency">Display Currency</label>
          <CurrencySelector
            defaultValue={displayCurrency}
            name="displayCurrency"
            onChange={setSelectedCurrency}
          />
        </FormGroup>
        <div css="margin-top: 2rem;">
          <FormButton onClick={handleSubmit} type="button">
            Save
          </FormButton>
        </div>
      </form>
    </Dialog>
  );
};

SettingsDialog.propTypes = {
  onClose: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  values: PropTypes.shape({
    currency: PropTypes.string.isRequired,
  }).isRequired,
};

export default SettingsDialog;

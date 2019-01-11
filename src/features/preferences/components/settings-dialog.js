import { FormGroup } from 'reactstrap';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import React, { useState } from 'react';
import styled from 'styled-components';

import { colors } from '../../../styles/constants';
import AsyncCurrencySelector from '../../currencies/components/async-currency-selector';
import Dialog from '../../../components/dialog';

const StyledCurrencySelector = styled(AsyncCurrencySelector)`
  color: ${colors.violet};

  && &__control {
    border-color: ${colors.mischka};
  }

  && &__control--is-focused {
    border-color: ${colors.stormGray};
    box-shadow: none;
  }

  && &__dropdown-indicator {
    color: ${colors.stormGray};
  }

  && &__indicator-separator {
    background-color: ${colors.mischka};
  }

  && &__option:hover,
  && &__option:active,
  && &__option--is-focused {
    background: ${colors.mischka};
    cursor: pointer;
  }

  && &__option--is-selected {
    background: ${colors.selago};
    color: ${colors.violet};
  }
`;

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

const SettingsDialog = ({ onClose, onSubmit, setCurrency, values }) => {
  const [selectedCurrency, setSelectedCurrency] = useState(values.currency);

  const handleSubmit = () => {
    setCurrency(selectedCurrency);
    onSubmit();
  };

  return (
    <Dialog height={300} onClose={onClose} title="Settings" width={450}>
      <form>
        <FormGroup>
          <label htmlFor="displayCurrency">Display Currency</label>
          <StyledCurrencySelector
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
  setCurrency: PropTypes.func.isRequired,
  values: PropTypes.shape({
    currency: PropTypes.string.isRequired,
  }).isRequired,
};

const mapStateToProps = state => ({
  values: {
    currency: state.preferences.currency,
  },
});

const mapDispatchToProps = dispatch => ({
  setCurrency: dispatch.preferences.setCurrency,
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(SettingsDialog);

import { FormGroup } from 'reactstrap';
import PropTypes from 'prop-types';
import React from 'react';
import styled from 'styled-components';

import { colors } from '../../../styles/constants';
import Dialog from '../../../components/dialog';
import tradersPropTypes from '../prop-types';
import TraderTypeSelector from './trader-type-selector';

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

const TradersFilterDialog = ({ onClose, onSubmit, selectedFilters }) => {
  const [values, setValues] = React.useState(selectedFilters);

  const handleChange = (value, fieldName) => {
    setValues(oldValues => ({ ...oldValues, [fieldName]: value }));
  };

  const handleSubmit = () => {
    onSubmit(values);
  };

  return (
    <Dialog height={300} onClose={onClose} title="Filter Traders" width={450}>
      <form>
        <FormGroup>
          <label htmlFor="displayCurrency">Trader Type</label>
          <TraderTypeSelector
            defaultValue={selectedFilters.type}
            name="type"
            onChange={handleChange}
          />
        </FormGroup>
        <div css="margin-top: 2rem;">
          <FormButton onClick={handleSubmit} type="button">
            Apply
          </FormButton>
        </div>
      </form>
    </Dialog>
  );
};

TradersFilterDialog.propTypes = {
  onClose: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  selectedFilters: PropTypes.shape({
    type: tradersPropTypes.traderType.isRequired,
  }),
};

TradersFilterDialog.defaultProps = {
  selectedFilters: {},
};

export default TradersFilterDialog;

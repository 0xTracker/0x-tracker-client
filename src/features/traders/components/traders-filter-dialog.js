import _ from 'lodash';
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

const SecondaryButton = styled(FormButton)`
  background-color: ${colors.athensGray};
  color: ${colors.violet};
  margin: 0 0 0 0.5rem;

  &:hover,
  &:active {
    background-color: ${colors.mischka};
  }
`;

const TradersFilterDialog = ({ defaultValues, onClose, onSubmit }) => {
  const [values, setValues] = React.useState(defaultValues);

  const handleChange = (value, fieldName) => {
    setValues(oldValues => ({ ...oldValues, [fieldName]: value }));
  };

  const handleSubmit = () => {
    onSubmit(values);
  };

  const handleReset = () => {
    setValues({ type: undefined });
  };

  return (
    <Dialog height={300} onClose={onClose} title="Filter Traders" width={450}>
      <form>
        <FormGroup>
          <label htmlFor="displayCurrency">Trader Type</label>
          <TraderTypeSelector
            name="type"
            onChange={handleChange}
            value={values.type}
          />
        </FormGroup>
        <div css="margin-top: 2rem;">
          <FormButton onClick={handleSubmit} type="button">
            Apply Filters
          </FormButton>
          {_.isEmpty(values) ? null : (
            <SecondaryButton onClick={handleReset} type="button">
              Reset
            </SecondaryButton>
          )}
        </div>
      </form>
    </Dialog>
  );
};

TradersFilterDialog.propTypes = {
  defaultValues: PropTypes.shape({
    type: tradersPropTypes.traderType,
  }),
  onClose: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
};

TradersFilterDialog.defaultProps = {
  defaultValues: {},
};

export default TradersFilterDialog;

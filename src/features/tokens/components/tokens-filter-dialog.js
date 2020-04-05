import _ from 'lodash';
import { FormGroup } from 'reactstrap';
import PropTypes from 'prop-types';
import React from 'react';
import styled from 'styled-components';

import { colors } from '../../../styles/constants';
import Dialog from '../../../components/dialog';
import sharedPropTypes from '../../../prop-types';
import TokenTypeSelector from './token-type-selector';
import TimePeriodSelector from '../../../components/time-period-selector';
import tokensPropTypes from '../prop-types';

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

const SecondaryFormButton = styled(FormButton)`
  background-color: ${colors.athensGrayer};
  color: ${colors.violet};
  margin: 0 0 0 0.5rem;

  &:hover,
  &:active {
    background-color: ${colors.mystic};
  }
`;

const FormLabel = styled.label`
  margin: 1.5rem 0 0 0;

  &:first-child {
    margin: 0;
  }
`;

const TokensFilterDialog = ({
  currentValues,
  defaultValues,
  onClose,
  onSubmit,
}) => {
  const [values, setValues] = React.useState(currentValues);

  const handleChange = (value, fieldName) => {
    setValues((oldValues) => ({ ...oldValues, [fieldName]: value }));
  };

  const handleSubmit = () => {
    onSubmit(values);
  };

  const handleReset = () => {
    setValues(defaultValues);
  };

  return (
    <Dialog height={350} onClose={onClose} title="Filter Tokens" width={450}>
      <form>
        <FormGroup>
          <FormLabel htmlFor="displayCurrency">Time Period</FormLabel>
          <TimePeriodSelector
            name="statsPeriod"
            onChange={handleChange}
            value={values.statsPeriod}
          />
          <FormLabel htmlFor="displayCurrency">Token Type</FormLabel>
          <TokenTypeSelector
            name="type"
            onChange={handleChange}
            value={values.type}
          />
        </FormGroup>
        <div css="margin-top: 2rem;">
          <FormButton onClick={handleSubmit} type="button">
            Apply Filters
          </FormButton>
          {_.isEqual(defaultValues, values) ? null : (
            <SecondaryFormButton onClick={handleReset} type="button">
              Reset
            </SecondaryFormButton>
          )}
        </div>
      </form>
    </Dialog>
  );
};

TokensFilterDialog.propTypes = {
  currentValues: PropTypes.shape({
    statsPeriod: sharedPropTypes.timePeriod.isRequired,
    type: tokensPropTypes.tokenType,
  }).isRequired,
  defaultValues: PropTypes.shape({
    statsPeriod: sharedPropTypes.timePeriod.isRequired,
    type: tokensPropTypes.tokenType,
  }),
  onClose: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
};

TokensFilterDialog.defaultProps = {
  defaultValues: {},
};

export default TokensFilterDialog;

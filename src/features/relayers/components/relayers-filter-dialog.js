import _ from 'lodash';
import { FormGroup } from 'reactstrap';
import PropTypes from 'prop-types';
import React from 'react';
import styled from 'styled-components';

import { colors } from '../../../styles/constants';
import Dialog from '../../../components/dialog';
import sharedPropTypes from '../../../prop-types';
import TimePeriodSelector from '../../../components/time-period-selector';

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
  background-color: ${colors.athensGray};
  color: ${colors.violet};
  margin: 0 0 0 0.5rem;

  &:hover,
  &:active {
    background-color: ${colors.mischka};
  }
`;

const FormLabel = styled.label`
  margin: 1.5rem 0 0 0;

  &:first-child {
    margin: 0;
  }
`;

const RelayersFilterDialog = ({
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
    <Dialog height={350} onClose={onClose} title="Filter Relayers" width={450}>
      <form>
        <FormGroup>
          <FormLabel htmlFor="statsPeriod">Time Period</FormLabel>
          <TimePeriodSelector
            name="statsPeriod"
            onChange={handleChange}
            value={values.statsPeriod}
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

RelayersFilterDialog.propTypes = {
  currentValues: PropTypes.shape({
    statsPeriod: sharedPropTypes.timePeriod.isRequired,
  }).isRequired,
  defaultValues: PropTypes.shape({
    statsPeriod: sharedPropTypes.timePeriod.isRequired,
  }),
  onClose: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
};

RelayersFilterDialog.defaultProps = {
  defaultValues: {},
};

export default RelayersFilterDialog;

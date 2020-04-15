import _ from 'lodash';
import { FormGroup } from 'reactstrap';
import PropTypes from 'prop-types';
import React from 'react';

import Dialog from '../../../components/dialog';
import FormLabel from '../../../components/form-label';
import PrimaryFormButton from '../../../components/primary-form-button';
import SecondaryFormButton from '../../../components/secondary-form-button';
import sharedPropTypes from '../../../prop-types';
import TimePeriodSelector from '../../../components/time-period-selector';
import tradersPropTypes from '../prop-types';
import TraderTypeSelector from './trader-type-selector';

const TradersFilterDialog = ({
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
    <Dialog height={350} onClose={onClose} title="Filter Traders" width={450}>
      <form>
        <FormGroup>
          <FormLabel css="margin: 0;" htmlFor="displayCurrency">
            Time Period
          </FormLabel>
          <TimePeriodSelector
            name="statsPeriod"
            onChange={handleChange}
            value={values.statsPeriod}
          />
          <FormLabel htmlFor="displayCurrency">Trader Type</FormLabel>
          <TraderTypeSelector
            name="type"
            onChange={handleChange}
            value={values.type}
          />
        </FormGroup>
        <div css="margin-top: 2rem;">
          <PrimaryFormButton onClick={handleSubmit} type="button">
            Apply Filters
          </PrimaryFormButton>
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

TradersFilterDialog.propTypes = {
  currentValues: PropTypes.shape({
    statsPeriod: sharedPropTypes.timePeriod.isRequired,
    type: tradersPropTypes.traderType,
  }).isRequired,
  defaultValues: PropTypes.shape({
    statsPeriod: sharedPropTypes.timePeriod.isRequired,
    type: tradersPropTypes.traderType,
  }),
  onClose: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
};

TradersFilterDialog.defaultProps = {
  defaultValues: {},
};

export default TradersFilterDialog;

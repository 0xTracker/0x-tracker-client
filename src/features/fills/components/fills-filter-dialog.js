import _ from 'lodash';
import { Col, FormGroup, Row } from 'reactstrap';
import PropTypes from 'prop-types';
import React from 'react';

import AppLookupField from '../../apps/components/app-lookup-field';
import DatePickerField from '../../../components/date-picker-field';
import Dialog from '../../../components/dialog';
import FormLabel from '../../../components/form-label';
import NumberField from '../../../components/number-field';
import PrimaryFormButton from '../../../components/primary-form-button';
import ProtocolVersionSelector from '../../../components/protocol-version-selector';
import TokenLookupField from '../../tokens/components/token-lookup-field';
import TraderLookupField from '../../traders/components/trader-lookup-field';
import SecondaryFormButton from '../../../components/secondary-form-button';

const FillsFilterDialog = ({
  currentValues,
  defaultValues,
  onClose,
  onSubmit,
}) => {
  const [values, setValues] = React.useState({
    ...currentValues,
    apps:
      currentValues.apps !== undefined
        ? currentValues.apps.join(',')
        : undefined,
  });

  const handleChange = (value, fieldName) => {
    setValues((oldValues) => ({ ...oldValues, [fieldName]: value }));
  };

  const handleSubmit = () => {
    if (window.fathom) {
      window.fathom.trackGoal('EBH59B4C', 0);
    }

    onSubmit(values);
  };

  const handleReset = () => {
    setValues(defaultValues);
  };

  return (
    <Dialog height={600} onClose={onClose} title="Filters" width={600}>
      <form noValidate onSubmit={handleSubmit}>
        <FormGroup>
          <Row>
            <Col sm={6} xs={12}>
              <FormLabel first htmlFor="dateFrom">
                Date From (UTC)
              </FormLabel>
              <DatePickerField
                dayPickerProps={{
                  disabledDays: (day) => day > Date.now(),
                }}
                name="dateFrom"
                onChange={handleChange}
                value={values.dateFrom}
              />
            </Col>
            <Col sm={6} xs={12}>
              <FormLabel first htmlFor="dateTo">
                Date To (UTC)
              </FormLabel>
              <DatePickerField
                dayPickerProps={{
                  disabledDays: (day) => day > Date.now(),
                }}
                endOfDay
                name="dateTo"
                onChange={handleChange}
                value={values.dateTo}
              />
            </Col>
          </Row>
          <Row>
            <Col sm={6} xs={12}>
              <FormLabel htmlFor="apps">App</FormLabel>
              <AppLookupField
                maxMenuHeight={200}
                name="apps"
                onChange={handleChange}
                value={values.apps}
              />
            </Col>
            <Col sm={6} xs={12}>
              <FormLabel htmlFor="token">Token</FormLabel>
              <TokenLookupField
                maxMenuHeight={200}
                name="token"
                onChange={handleChange}
                value={values.token}
              />
            </Col>
          </Row>

          <Row>
            <Col sm={6} xs={12}>
              <FormLabel htmlFor="trader">Trader</FormLabel>
              <TraderLookupField
                maxMenuHeight={200}
                name="trader"
                onChange={handleChange}
                value={values.trader}
              />
            </Col>
            <Col sm={6} xs={12}>
              <FormLabel htmlFor="protocolVersion">Protocol Version</FormLabel>
              <ProtocolVersionSelector
                name="protocolVersion"
                onChange={handleChange}
                value={values.protocolVersion}
              />
            </Col>
          </Row>
          <Row>
            <Col sm={6} xs={12}>
              <FormLabel htmlFor="valueFrom">Min Value (USD)</FormLabel>
              <NumberField
                name="valueFrom"
                onChange={handleChange}
                placeholder="No min"
                value={values.valueFrom}
              />
            </Col>
            <Col sm={6} xs={12}>
              <FormLabel htmlFor="valueFrom">Max Value (USD)</FormLabel>
              <NumberField
                name="valueTo"
                onChange={handleChange}
                placeholder="No max"
                value={values.valueTo}
              />
            </Col>
          </Row>
        </FormGroup>
        <div css="display: flex; margin-top: 2rem;">
          <PrimaryFormButton type="submit">Apply Filters</PrimaryFormButton>
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

FillsFilterDialog.propTypes = {
  currentValues: PropTypes.shape({
    apps: PropTypes.arrayOf(PropTypes.string.isRequired),
    protocolVersion: PropTypes.number,
    status: PropTypes.string,
    valueFrom: PropTypes.number,
    valueTo: PropTypes.number,
  }).isRequired,
  defaultValues: PropTypes.shape({
    apps: PropTypes.arrayOf(PropTypes.string.isRequired),
    protocolVersion: PropTypes.number,
    status: PropTypes.string,
    valueFrom: PropTypes.number,
    valueTo: PropTypes.number,
  }),
  onClose: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
};

FillsFilterDialog.defaultProps = {
  defaultValues: {},
};

export default FillsFilterDialog;

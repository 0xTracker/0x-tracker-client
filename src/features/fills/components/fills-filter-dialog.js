import _ from 'lodash';
import { Col, FormGroup, Row } from 'reactstrap';
import PropTypes from 'prop-types';
import React from 'react';

import Dialog from '../../../components/dialog';
import FillStatusSelector from './fill-status-selector';
import FormLabel from '../../../components/form-label';
import NumberField from '../../../components/number-field';
import PrimaryFormButton from '../../../components/primary-form-button';
import ProtocolVersionSelector from '../../../components/protocol-version-selector';
import RelayerSelector from '../../relayers/components/relayer-selector';
import SecondaryFormButton from '../../../components/secondary-form-button';

const FillsFilterDialog = ({
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
    <Dialog height={600} onClose={onClose} title="Filter Fills" width={450}>
      <form noValidate onSubmit={handleSubmit}>
        <FormGroup>
          <FormLabel first htmlFor="relayer">
            Relayer
          </FormLabel>
          <RelayerSelector
            name="relayer"
            onChange={handleChange}
            value={values.relayer}
          />
          <FormLabel htmlFor="protocolVersion">Protocol Version</FormLabel>
          <ProtocolVersionSelector
            name="protocolVersion"
            onChange={handleChange}
            value={values.protocolVersion}
          />
          <FormLabel htmlFor="status">Status</FormLabel>
          <FillStatusSelector
            name="status"
            onChange={handleChange}
            value={values.status}
          />
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
        <div css="margin-top: 2rem;">
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
    protocolVersion: PropTypes.number,
    relayer: PropTypes.number,
    status: PropTypes.string,
    valueFrom: PropTypes.number,
    valueTo: PropTypes.number,
  }).isRequired,
  defaultValues: PropTypes.shape({
    protocolVersion: PropTypes.number,
    relayer: PropTypes.number,
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

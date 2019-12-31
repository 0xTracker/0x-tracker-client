import _ from 'lodash';
import { Col, FormGroup, Row } from 'reactstrap';
import PropTypes from 'prop-types';
import React from 'react';
import styled from 'styled-components';

import { colors } from '../../../styles/constants';
import Dialog from '../../../components/dialog';
import FillStatusSelector from './fill-status-selector';
import NumberField from '../../../components/number-field';
import ProtocolVersionSelector from '../../../components/protocol-version-selector';
import RelayerSelector from '../../relayers/components/relayer-selector';

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
`;

const FillsFilterDialog = ({
  currentValues,
  defaultValues,
  onClose,
  onSubmit,
}) => {
  const [values, setValues] = React.useState(currentValues);

  const handleChange = (value, fieldName) => {
    setValues(oldValues => ({ ...oldValues, [fieldName]: value }));
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
          <FormLabel css="margin: 0;" htmlFor="relayer">
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
          <FormButton type="submit">Apply Filters</FormButton>
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
  }).isRequired,
  defaultValues: PropTypes.shape({
    protocolVersion: PropTypes.number,
  }),
  onClose: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
};

FillsFilterDialog.defaultProps = {
  defaultValues: {},
};

export default FillsFilterDialog;

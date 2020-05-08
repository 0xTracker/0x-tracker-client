import _ from 'lodash';
import { storiesOf } from '@storybook/react';
import { Col, FormGroup, Row } from 'reactstrap';
import React from 'react';

import FormLabel from '../components/form-label';
import NumberField from '../components/number-field';
import PrimaryFormButton from '../components/primary-form-button';
import SecondaryFormButton from '../components/secondary-form-button';
import Select from '../components/select';
import TokenLookupField from '../features/tokens/components/token-lookup-field';
import TokenTypeSelector from '../features/tokens/components/token-type-selector';
import TimePeriodSelector from '../components/time-period-selector';

storiesOf('Common|Forms', module)
  .addDecorator((storyFn) => (
    <div css="padding: 2rem; max-width: 450px;">{storyFn()}</div>
  ))
  .add('Basic', () => {
    const defaultValues = {
      statsPeriod: 'day',
      title: null,
      type: 'erc-20',
      valueFrom: null,
      valueTo: null,
    };
    const [formValues, setFormValues] = React.useState(defaultValues);

    const handleFieldChange = (value, field) =>
      setFormValues((prev) => ({ ...prev, [field]: value }));

    return (
      <form action="#" onSubmit={_.noop}>
        <FormGroup>
          <FormLabel first htmlFor="title">
            Title
          </FormLabel>
          <Select
            isClearable
            isSearchable={false}
            name="title"
            onChange={handleFieldChange}
            options={[
              { label: 'Mr', value: 'mr' },
              { label: 'Mrs', value: 'mrs' },
            ]}
            value={formValues.title}
          />
          <FormLabel htmlFor="token">Token</FormLabel>
          <TokenLookupField
            menuIsOpen
            name="token"
            onChange={handleFieldChange}
          />
          <FormLabel htmlFor="statsPeriod">Time Period</FormLabel>
          <TimePeriodSelector
            name="statsPeriod"
            onChange={handleFieldChange}
            value={formValues.statsPeriod}
          />
          <FormLabel htmlFor="type">Token Type</FormLabel>
          <TokenTypeSelector
            name="type"
            onChange={handleFieldChange}
            value={formValues.type}
          />
          <Row>
            <Col sm={6} xs={12}>
              <FormLabel htmlFor="valueFrom">Min Value (USD)</FormLabel>
              <NumberField
                name="valueFrom"
                onChange={handleFieldChange}
                placeholder="No min"
                value={formValues.valueFrom}
              />
            </Col>
            <Col sm={6} xs={12}>
              <FormLabel htmlFor="valueFrom">Max Value (USD)</FormLabel>
              <NumberField
                name="valueTo"
                onChange={handleFieldChange}
                placeholder="No max"
                value={formValues.valueTo}
              />
            </Col>
          </Row>
        </FormGroup>
        <div css="margin-top: 2rem;">
          <PrimaryFormButton onClick={_.noop} type="button">
            Submit
          </PrimaryFormButton>
          <SecondaryFormButton
            onClick={() => setFormValues(defaultValues)}
            type="button"
          >
            Reset
          </SecondaryFormButton>
        </div>
      </form>
    );
  })
  .add('Open Dropdown', () => (
    <>
      <FormLabel first htmlFor="displayCurrency">
        Time Period
      </FormLabel>
      <TimePeriodSelector
        menuIsOpen
        name="statsPeriod"
        onChange={_.noop}
        value="day"
      />
    </>
  ));

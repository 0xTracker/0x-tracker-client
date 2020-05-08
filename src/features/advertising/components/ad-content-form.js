import { Col, FormGroup, Row } from 'reactstrap';
import PropTypes from 'prop-types';
import React, { useState } from 'react';

import EmailField from '../../../components/email-field';
import FormLabel from '../../../components/form-label';
import PrimaryFormButton from '../../../components/primary-form-button';
import SecondaryFormButton from '../../../components/secondary-form-button';
import TextField from '../../../components/text-field';

const AdContentForm = ({ onSubmit }) => {
  const [values, setValues] = useState({});

  const handleChange = (value, fieldName) =>
    setValues((existingValues) => ({ ...existingValues, [fieldName]: value }));

  const handleSubmit = (event) => {
    event.preventDefault();

    onSubmit(values);
  };

  return (
    <form onSubmit={handleSubmit}>
      <FormGroup>
        <Row>
          <Col sm={6}>
            <FormLabel first htmlFor="title">
              Title
            </FormLabel>
            <TextField
              name="title"
              onChange={handleChange}
              placeholder="Brave Browser"
              required
              type="text"
              value={values.title}
            />
          </Col>
          <Col sm={6}>
            <FormLabel first htmlFor="description">
              Description
            </FormLabel>
            <TextField
              name="description"
              onChange={handleChange}
              placeholder="Secure your browser and earn crypto rewards just for browsing the web"
              required
              type="description"
              value={values.description}
            />
          </Col>
        </Row>
        <Row>
          <Col sm={6}>
            <FormLabel htmlFor="url">URL</FormLabel>
            <TextField
              name="url"
              onChange={handleChange}
              placeholder="https://brave.com/"
              required
              type="text"
              value={values.url}
            />
          </Col>
          <Col sm={6}>
            <FormLabel htmlFor="url">Icon URL</FormLabel>
            <TextField
              name="iconUrl"
              onChange={handleChange}
              placeholder="https://yourdomain.com/images/icon.png"
              required
              type="text"
              value={values.iconUrl}
            />
          </Col>
        </Row>
        <Row>
          <Col sm={6}>
            <FormLabel htmlFor="email">Your Email</FormLabel>
            <EmailField
              name="email"
              onChange={handleChange}
              required
              value={values.email}
            />
          </Col>
        </Row>
      </FormGroup>
      <div css="margin-top: 2rem;">
        <PrimaryFormButton type="submit">Submit</PrimaryFormButton>
        <SecondaryFormButton type="submit">Preview</SecondaryFormButton>
      </div>
    </form>
  );
};

AdContentForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};

export default AdContentForm;

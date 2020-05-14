import { Col, FormGroup, Row } from 'reactstrap';
import PropTypes from 'prop-types';
import React, { useState } from 'react';

import { COLORS } from '../../../styles/constants';
import AdContentPreview from './ad-content-preview';
import EmailField from '../../../components/email-field';
import FormLabel from '../../../components/form-label';
import LoadingIndicator from '../../../components/loading-indicator';
import PrimaryFormButton from '../../../components/primary-form-button';
import SecondaryFormButton from '../../../components/secondary-form-button';
import TextField from '../../../components/text-field';

const AdContentForm = ({ defaultValues, onSubmit }) => {
  const [values, setValues] = useState(defaultValues);
  const [submitting, setSubmitting] = useState(false);
  const [previewVisible, setPreviewVisible] = useState(false);

  const handleChange = (value, fieldName) =>
    setValues((existingValues) => ({ ...existingValues, [fieldName]: value }));

  const handleSubmit = (event) => {
    event.preventDefault();

    setSubmitting(true);

    // eslint-disable-next-line promise/catch-or-return
    onSubmit(values).then(() => {
      setSubmitting(false);
    });
  };

  return (
    <>
      {previewVisible && (
        <AdContentPreview
          content={values}
          onClose={() => {
            setPreviewVisible(false);
          }}
        />
      )}
      <form onSubmit={handleSubmit}>
        <FormGroup>
          <Row>
            <Col sm={6}>
              <FormLabel first htmlFor="title">
                Title
              </FormLabel>
              <TextField
                disabled={submitting}
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
                disabled={submitting}
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
                disabled={submitting}
                name="url"
                onChange={handleChange}
                placeholder="https://brave.com/"
                required
                type="text"
                value={values.url}
              />
            </Col>
            <Col sm={6}>
              <FormLabel htmlFor="url">Image URL</FormLabel>
              <TextField
                disabled={submitting}
                name="imageUrl"
                onChange={handleChange}
                placeholder="https://yourdomain.com/images/logo.png"
                required
                type="text"
                value={values.imageUrl}
              />
            </Col>
          </Row>
          <Row>
            <Col sm={6}>
              <FormLabel htmlFor="notificationEmail">
                Notification Email
              </FormLabel>
              <EmailField
                disabled={submitting}
                name="notificationEmail"
                onChange={handleChange}
                required
                value={values.notificationEmail}
              />
            </Col>
          </Row>
        </FormGroup>
        <div
          css={`
            border-top: 2px solid ${COLORS.NEUTRAL.MYSTIC_200};
            display: flex;
            margin-top: 2rem;
            padding-top: 1rem;
          `}
        >
          <PrimaryFormButton disabled={submitting} type="submit">
            {submitting ? (
              <LoadingIndicator
                color="currentColor"
                size="small"
                type="cylon"
              />
            ) : (
              'Submit'
            )}
          </PrimaryFormButton>
          <SecondaryFormButton
            disabled={submitting}
            onClick={(event) => {
              event.preventDefault();
              setPreviewVisible(true);
            }}
            type="submit"
          >
            Preview
          </SecondaryFormButton>
        </div>
      </form>
    </>
  );
};

AdContentForm.propTypes = {
  defaultValues: PropTypes.shape({}),
  onSubmit: PropTypes.func.isRequired,
};

AdContentForm.defaultProps = {
  defaultValues: {},
};

export default AdContentForm;

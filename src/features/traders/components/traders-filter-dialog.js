import { FormGroup } from 'reactstrap';
import PropTypes from 'prop-types';
import React from 'react';
import styled from 'styled-components';

import { colors } from '../../../styles/constants';
import Dialog from '../../../components/dialog';

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

const TradersFilterDialog = ({ onClose, onSubmit }) => {
  const handleSubmit = () => {
    onSubmit();
  };

  return (
    <Dialog height={300} onClose={onClose} title="Filter Traders" width={450}>
      <form>
        <FormGroup />
        <div css="margin-top: 2rem;">
          <FormButton onClick={handleSubmit} type="button">
            Apply
          </FormButton>
        </div>
      </form>
    </Dialog>
  );
};

TradersFilterDialog.propTypes = {
  onClose: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  values: PropTypes.shape({
    currency: PropTypes.string.isRequired,
  }).isRequired,
};

export default TradersFilterDialog;

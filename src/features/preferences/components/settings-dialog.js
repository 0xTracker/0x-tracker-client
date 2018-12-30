import { connect } from 'react-redux';
import {
  Button,
  FormGroup,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from 'reactstrap';
import PropTypes from 'prop-types';
import React, { PureComponent } from 'react';
import styled from 'styled-components';

import { colors } from '../../../styles/constants';
import AsyncCurrencySelector from '../../currencies/components/async-currency-selector';

const StyledModal = styled(Modal)`
  .modal-content {
    border: none;
    border-radius: 0;
  }

  .modal-header {
    background-color: ${colors.mischka};
  }
`;

class SettingsDialog extends PureComponent {
  constructor() {
    super();

    this.state = { currency: null };
    this.saveChanges = this.handleSave.bind(this);
    this.handleChangeCurrency = this.handleChangeCurrency.bind(this);
    this.handleSave = this.handleSave.bind(this);
  }

  handleSave() {
    const { currency } = this.state;
    const { handleClose, setCurrency } = this.props;

    if (currency !== null) {
      setCurrency(currency);
    }

    handleClose();
  }

  handleChangeCurrency(currency) {
    this.setState({ currency });
  }

  render() {
    const { handleClose, isOpen } = this.props;

    return (
      <React.Fragment>
        {/* eslint-disable-next-line react/jsx-handler-names */}
        <StyledModal centered isOpen={isOpen} toggle={this.handleClose}>
          {/* eslint-disable-next-line react/jsx-handler-names */}
          <ModalHeader toggle={this.handleClose}>Settings</ModalHeader>
          <ModalBody>
            <FormGroup>
              <label htmlFor="displayCurrency">Display Currency</label>
              <AsyncCurrencySelector
                name="displayCurrency"
                onChange={this.handleChangeCurrency}
              />
            </FormGroup>
          </ModalBody>
          <ModalFooter>
            <Button color="primary" onClick={this.handleSave}>
              Save changes
            </Button>{' '}
            <Button color="secondary" onClick={handleClose}>
              Close
            </Button>
          </ModalFooter>
        </StyledModal>
      </React.Fragment>
    );
  }
}

SettingsDialog.propTypes = {
  handleClose: PropTypes.func.isRequired,
  isOpen: PropTypes.bool,
  setCurrency: PropTypes.func.isRequired,
};

SettingsDialog.defaultProps = {
  isOpen: false,
};

const mapDispatchToProps = dispatch => ({
  setCurrency: dispatch.preferences.setCurrency,
});

export default connect(
  null,
  mapDispatchToProps,
)(SettingsDialog);

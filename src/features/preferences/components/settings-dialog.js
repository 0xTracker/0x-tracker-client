import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Modal from 'react-modal';
import PropTypes from 'prop-types';
import React, { PureComponent } from 'react';

import * as preferencesActionCreators from '../actions';
import CurrencySelector from '../../currencies/components/currency-selector';

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
      handleClose();
    }
  }

  handleChangeCurrency(currency) {
    this.setState({ currency });
  }

  render() {
    const { handleClose, isOpen } = this.props;

    return (
      <Modal
        isOpen={isOpen}
        // eslint-disable-next-line react/forbid-component-props
        style={{
          content: {
            backgroundColor: '#f4f4f4',
            border: '0',
            borderRadius: '7px',
            bottom: 'auto',
            height: 'auto',
            left: '50%',
            padding: '0',
            position: 'fixed',
            right: 'auto',
            top: '50%',
            transform: 'translate(-50%,-50%)',
            width: '300px',
          },
          overlay: { backgroundColor: 'rgba(51, 51, 51, 0.8)' },
        }}
      >
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Settings</h5>
              <button
                aria-label="Close"
                className="close"
                onClick={handleClose}
                type="button"
              >
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div className="modal-body">
              <div className="form-group">
                <label htmlFor="inputEmail3">Base Currency</label>
                <CurrencySelector onChange={this.handleChangeCurrency} />
              </div>
            </div>
            <div className="modal-footer">
              <button
                className="btn btn-primary"
                onClick={this.handleSave}
                type="button"
              >
                Save changes
              </button>
              <button
                className="btn btn-secondary"
                onClick={handleClose}
                type="button"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </Modal>
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
  ...bindActionCreators(preferencesActionCreators, dispatch),
});

export default connect(
  null,
  mapDispatchToProps,
)(SettingsDialog);

import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import React from 'react';

import { getDisplayCurrency } from '../../currencies/selectors';
import PreferencesContext from '../contexts/preferences-context';

const UnconnectedPreferencesProvider = ({ children, displayCurrency }) => (
  <PreferencesContext.Provider value={{ displayCurrency }}>
    {children}
  </PreferencesContext.Provider>
);

UnconnectedPreferencesProvider.propTypes = {
  children: PropTypes.node.isRequired,
  displayCurrency: PropTypes.string.isRequired,
};

const mapStateToProps = state => ({
  displayCurrency: getDisplayCurrency(state),
});

const PreferencesProvider = connect(mapStateToProps)(
  UnconnectedPreferencesProvider,
);

export default PreferencesProvider;

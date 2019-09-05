import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import React from 'react';

import PreferencesContext from '../contexts/preferences-context';

const UnconnectedPreferencesProvider = ({
  children,
  displayCurrency,
  setCurrency,
}) => {
  const updatePreferences = React.useCallback(newPreferences => {
    setCurrency(newPreferences.displayCurrency);
  }, []);

  const [value, setValue] = React.useState({
    update: updatePreferences,
    values: { displayCurrency },
  });

  React.useEffect(() => {
    setValue({
      update: updatePreferences,
      values: { displayCurrency },
    });
  }, [displayCurrency]);

  return (
    <PreferencesContext.Provider value={value}>
      {children}
    </PreferencesContext.Provider>
  );
};

UnconnectedPreferencesProvider.propTypes = {
  children: PropTypes.node.isRequired,
  displayCurrency: PropTypes.string.isRequired,
  setCurrency: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  displayCurrency: state.preferences.currency,
});

const mapDispatchToProps = dispatch => ({
  setCurrency: dispatch.preferences.setCurrency,
});

const PreferencesProvider = connect(
  mapStateToProps,
  mapDispatchToProps,
)(UnconnectedPreferencesProvider);

export default PreferencesProvider;

import { connect } from 'react-redux';
import { css, StyleSheet } from 'aphrodite';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import Select from 'react-select';

import { CURRENCIES } from '../constants';
import media from '../../../styles/media';

const styles = StyleSheet.create({
  'top-bar': {
    display: 'none',
    [media.desktop]: {
      display: 'block',
    },
  },
});

class CurrencySelector extends Component {
  constructor(props) {
    super(props);

    const { selected } = this.props;

    this.handleChange = this.handleChange.bind(this);
    this.state = { value: selected };
  }

  handleChange(option) {
    const { onChange } = this.props;

    this.setState({ value: option.value });
    onChange(option.value);
  }

  render() {
    const { variant } = this.props;
    const { value } = this.state;

    return (
      <Select
        className={classNames(
          'currency-selector',
          css(styles[variant]),
          variant,
        )}
        clearable={false}
        onChange={this.handleChange}
        options={CURRENCIES.map(currency => ({
          value: currency.symbol,
          label: `${currency.name} (${currency.symbol})`,
        }))}
        searchable={false}
        value={value}
      />
    );
  }
}

CurrencySelector.propTypes = {
  onChange: PropTypes.func.isRequired,
  selected: PropTypes.string.isRequired,
  variant: PropTypes.string,
};

CurrencySelector.defaultProps = {
  variant: undefined,
};

const mapStateToProps = state => ({
  selected: state.preferences.currency,
});

export default connect(mapStateToProps)(CurrencySelector);

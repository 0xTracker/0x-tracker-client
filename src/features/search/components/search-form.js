import _ from 'lodash';
import { css, StyleSheet } from 'aphrodite';
import { withRouter } from 'react-router';
import classNames from 'classnames';
import IoSearch from 'react-icons/lib/io/search';
import PropTypes from 'prop-types';
import React, { PureComponent } from 'react';

import buildSearchUrl from '../util/build-search-url';

const styles = StyleSheet.create({
  button: {
    borderTopLeftRadius: 0,
    borderBottomLeftRadius: 0,
    height: '34px',
  },
  input: {
    border: 'none',
    borderBottomRightRadius: 0,
    borderTopRightRadius: 0,
    height: '34px',
    fontSize: '14px',
    padding: '0 0.7rem',
    width: '300px',
  },
});

class SearchForm extends PureComponent {
  constructor() {
    super();
    this.state = { searchQuery: '' };
    this.handleSearchQueryChange = this.handleSearchQueryChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSearchQueryChange(event) {
    this.setState({ searchQuery: event.target.value });
  }

  handleSubmit(event) {
    const { searchQuery } = this.state;
    const { history } = this.props;

    event.preventDefault();

    if (!_.isEmpty(_.trim(searchQuery))) {
      history.push(buildSearchUrl(searchQuery));
      this.setState({ searchQuery: '' });
    }
  }

  render() {
    const { searchQuery } = this.state;

    return (
      <form className="form-inline" method="get" onSubmit={this.handleSubmit}>
        <input
          aria-label="Search"
          className={classNames('form-control', css(styles.input))}
          onChange={this.handleSearchQueryChange}
          placeholder="Order Hash / Tx Hash / Maker / Taker"
          required
          type="search"
          value={searchQuery}
        />
        <button
          className={classNames(
            'btn',
            'btn-secondary',
            'btn-icon',
            css(styles.button),
          )}
          onClick={this.handleSubmit}
          type="submit"
        >
          <IoSearch />
        </button>
      </form>
    );
  }
}

SearchForm.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

export default withRouter(SearchForm);

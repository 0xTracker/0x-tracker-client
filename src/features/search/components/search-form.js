import _ from 'lodash';
import { Form } from 'reactstrap';
import { withRouter } from 'react-router';
import PropTypes from 'prop-types';
import React, { PureComponent } from 'react';

import buildSearchUrl from '../util/build-search-url';

class SearchForm extends PureComponent {
  state = { searchQuery: '' };

  handleSearchQueryChange = event => {
    this.setState({ searchQuery: event.target.value });
  };

  handleSubmit = event => {
    const { searchQuery } = this.state;
    const { history, onSearch } = this.props;

    event.preventDefault();

    if (!_.isEmpty(_.trim(searchQuery))) {
      history.push(buildSearchUrl(searchQuery));
      this.setState({ searchQuery: '' });
      onSearch();
    }
  };

  render() {
    const { searchQuery } = this.state;
    const { children, className } = this.props;

    return (
      <Form
        className={className}
        inline
        onSubmit={this.handleSubmit}
        role="search"
      >
        {children({
          currentValue: searchQuery,
          handleChange: this.handleSearchQueryChange,
          handleSubmit: this.handleSubmit,
        })}
      </Form>
    );
  }
}

SearchForm.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
  onSearch: PropTypes.func.isRequired,
};

SearchForm.defaultProps = {
  className: undefined,
};

export default withRouter(SearchForm);

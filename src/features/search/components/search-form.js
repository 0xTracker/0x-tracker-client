import _ from 'lodash';
import { Button, Form, Input } from 'reactstrap';
import { withRouter } from 'react-router';
import { Search as SearchIcon } from 'styled-icons/fa-solid/Search';
import PropTypes from 'prop-types';
import React, { PureComponent } from 'react';
import styled from 'styled-components';

import buildSearchUrl from '../util/build-search-url';

const SearchInput = styled(Input)`
  && {
    border: none;
    border-bottom-right-radius: 0;
    border-top-right-radius: 0;
    height: 34px;
    font-size: 14px;
    padding: 0 0.7rem;
    width: 300px;
  }
`;

const SearchButton = styled(Button).attrs({
  color: 'secondary',
  type: 'submit',
})`
  border-top-left-radius: 0;
  border-bottom-left-radius: 0;
  height: 34px;
  line-height: 1;
`;

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
      <Form inline onSubmit={this.handleSubmit}>
        <SearchInput
          aria-label="Search"
          onChange={this.handleSearchQueryChange}
          placeholder="Order Hash / Tx Hash / Maker / Taker"
          required
          type="search"
          value={searchQuery}
        />
        <SearchButton onClick={this.handleSubmit}>
          <SearchIcon height={16} width={16} />
        </SearchButton>
      </Form>
    );
  }
}

SearchForm.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

export default withRouter(SearchForm);

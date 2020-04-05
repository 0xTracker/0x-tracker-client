import _ from 'lodash';
import { Form } from 'reactstrap';
import { useHistory } from 'react-router';
import PropTypes from 'prop-types';
import React from 'react';

import buildSearchUrl from '../util/build-search-url';

const SearchForm = ({ children, className, onSearch }) => {
  const history = useHistory();
  const [searchQuery, updateSearchQuery] = React.useState('');

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!_.isEmpty(_.trim(searchQuery))) {
      history.push(buildSearchUrl(searchQuery));
      updateSearchQuery('');
      onSearch();
    }
  };

  const handleSearchQueryChange = (event) => {
    updateSearchQuery(event.target.value);
  };

  return (
    <Form className={className} inline onSubmit={handleSubmit} role="search">
      {children({
        currentValue: searchQuery,
        handleChange: handleSearchQueryChange,
        handleSubmit,
      })}
    </Form>
  );
};

SearchForm.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
  onSearch: PropTypes.func.isRequired,
};

SearchForm.defaultProps = {
  className: undefined,
};

export default SearchForm;

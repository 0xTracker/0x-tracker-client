import _ from 'lodash';
import PropTypes from 'prop-types';
import React from 'react';

const withPagination = (WrappedComponent) => {
  const WithPagination = ({ history, location, ...otherProps }) => {
    const params = new URLSearchParams(location.search);
    const pageParam = Number(params.get('page'));
    const page = _.isNaN(pageParam) || pageParam <= 0 ? 1 : pageParam;

    const setPage = (newPage) => {
      params.set('page', newPage);
      const newUrl = `${location.pathname}?${params.toString()}`;

      history.push(newUrl);
    };

    return (
      <WrappedComponent
        {...otherProps}
        history={history}
        location={location}
        page={page}
        setPage={setPage}
      />
    );
  };

  WithPagination.propTypes = {
    history: PropTypes.shape({
      push: PropTypes.func.isRequired,
    }).isRequired,
    location: PropTypes.shape({
      pathname: PropTypes.string.isRequired,
      search: PropTypes.string.isRequired,
    }).isRequired,
  };

  return WithPagination;
};

export default withPagination;

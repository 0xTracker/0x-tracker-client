import _ from 'lodash';
import PropTypes from 'prop-types';
import React from 'react';

import InvalidParametersError from './invalid-parameters-error';
import UnexpectedError from './unexpected-error';

class ErrorBoundary extends React.PureComponent {
  state = {};

  componentDidCatch(error) {
    if (_.has(window, 'bugsnagClient')) {
      window.bugsnagClient.notify(error);
    }

    this.setState({ error });
  }

  render() {
    const { error } = this.state;
    const { children } = this.props;

    if (error === undefined) {
      return children;
    }

    if (error.response !== undefined && error.response.status === 400) {
      return <InvalidParametersError />;
    }

    return <UnexpectedError />;
  }
}

ErrorBoundary.propTypes = {
  children: PropTypes.node.isRequired,
};

export default ErrorBoundary;

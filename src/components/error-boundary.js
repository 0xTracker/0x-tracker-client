import PropTypes from 'prop-types';
import React from 'react';
import styled from 'styled-components';

import ErrorMessage from './error-message';
import H1 from './h1';
import Lead from './lead';
import { colors } from '../styles/constants';

const TryAgainButton = styled.button`
  background: none;
  border: none;
  color: ${colors.indigo};
  cursor: pointer;
  padding: 0;

  &:hover {
    color: inherit;
    text-decoration: none;
  }
`;

class ErrorBoundary extends React.PureComponent {
  state = {};

  componentDidCatch(error) {
    this.setState({ error });
  }

  render() {
    const { error } = this.state;
    const { children } = this.props;

    if (error) {
      return (
        <ErrorMessage css="min-height: 100%; padding: 0 4rem;">
          <H1>Unexpected Error</H1>
          <Lead>
            Oops, an unexpected error occurred whilst trying to display this
            page.
          </Lead>
          <TryAgainButton
            onClick={() => {
              window.location.reload();
            }}
            type="button"
          >
            Reload Page
          </TryAgainButton>
        </ErrorMessage>
      );
    }

    return children;
  }
}

ErrorBoundary.propTypes = {
  children: PropTypes.node.isRequired,
};

export default ErrorBoundary;

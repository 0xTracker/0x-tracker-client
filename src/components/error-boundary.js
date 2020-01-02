import _ from 'lodash';
import PropTypes from 'prop-types';
import React from 'react';
import styled, { createGlobalStyle } from 'styled-components';

import { colors } from '../styles/constants';
import ErrorMessage from './error-message';
import H1 from './h1';
import Lead from './lead';

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

const GlobalStyles = createGlobalStyle`
  #root {
    min-height: 100vh;
  }
`;

const Wrapper = styled.div`
  align-items: center;
  display: flex;
  flex-direction: column;
  justify-content: center;
  min-height: 100vh;
`;

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
      return (
        <>
          <GlobalStyles />
          <Wrapper>
            <ErrorMessage css="padding: 0 4rem;">
              <H1>Invalid Parameters</H1>
              <Lead>
                The URL parameters passed to this page were incorrect. Please
                check and try again.
              </Lead>
            </ErrorMessage>
          </Wrapper>
        </>
      );
    }

    return (
      <>
        <GlobalStyles />
        <Wrapper>
          <ErrorMessage css="padding: 0 4rem;">
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
        </Wrapper>
      </>
    );
  }
}

ErrorBoundary.propTypes = {
  children: PropTypes.node.isRequired,
};

export default ErrorBoundary;

import React from 'react';
import styled from 'styled-components';

import { COLORS } from '../styles/constants';
import ErrorMessage from './error-message';
import H1 from './h1';
import Lead from './lead';

const Wrapper = styled.div`
  align-items: center;
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  justify-content: center;
`;

const TryAgainButton = styled.button`
  background: ${COLORS.NEUTRAL.MYSTIC_400};
  border: none;
  border-radius: 0.25rem;
  color: ${COLORS.NEUTRAL.MYSTIC_900};
  cursor: pointer;
  font-size: 0.8em;
  font-weight: 500;
  letter-spacing: 0.05em;
  padding: 0.5rem 1.5rem;
  text-transform: uppercase;

  &:hover {
    background-color: ${COLORS.NEUTRAL.MYSTIC_500};
    text-decoration: none;
  }
`;

const UnexpectedError = () => (
  <Wrapper>
    <ErrorMessage css="padding: 0 4rem;">
      <H1>Unexpected Error</H1>
      <Lead>
        Oops, an unexpected error occurred whilst trying to display this page.
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
);

export default UnexpectedError;

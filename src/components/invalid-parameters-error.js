import React from 'react';
import styled from 'styled-components';

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

const InvalidParametersError = () => (
  <Wrapper>
    <ErrorMessage css="padding: 0 4rem;">
      <H1>Invalid Parameters</H1>
      <Lead>
        The URL parameters passed to this page were incorrect. Please check and
        try again.
      </Lead>
    </ErrorMessage>
  </Wrapper>
);

export default InvalidParametersError;

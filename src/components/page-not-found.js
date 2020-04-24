import React from 'react';
import styled from 'styled-components';

import { COLORS } from '../styles/constants';
import ErrorMessage from './error-message';
import H1 from './h1';
import Lead from './lead';
import Link from './link';
import PageLayout from './page-layout';

const StyledErrorMessage = styled(ErrorMessage)`
  padding: 1rem 4rem;
`;

const PageNotFound = () => (
  <PageLayout centered>
    <StyledErrorMessage>
      <H1>Page Not Found</H1>
      <Lead>Oops, the page you requested doesn&lsquo;t exist.</Lead>
      <Link
        css={`
          color: ${COLORS.PRIMARY.SCAMPI_500};
          font-weight: 500;
        `}
        href="/"
      >
        Back to homepage
      </Link>
    </StyledErrorMessage>
  </PageLayout>
);

export default PageNotFound;

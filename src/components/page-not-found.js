import React from 'react';

import ErrorMessage from './error-message';
import H1 from './h1';
import Lead from './lead';
import Link from './link';
import PageLayout from './page-layout';

const PageNotFound = () => (
  <PageLayout centered>
    <ErrorMessage css="padding: 3rem 4rem 0;">
      <H1>Page Not Found</H1>
      <Lead>Oops, the page you requested doesn&lsquo;t exist.</Lead>
      <Link href="/">Back to Dashboard</Link>
    </ErrorMessage>
  </PageLayout>
);

export default PageNotFound;

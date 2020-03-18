import { Helmet } from 'react-helmet';
import React from 'react';

import Card from '../../../components/card';
import PageLayout from '../../../components/page-layout';
import useTermly from '../hooks/use-termly';

const TermsPage = () => {
  useTermly();

  return (
    <PageLayout>
      <Helmet>
        <title>Terms Of Use</title>
      </Helmet>
      <Card>
        <div
          data-id="e8d4a31d-78d8-4c08-9c66-ec6dcdc68628"
          data-type="iframe"
          name="termly-embed"
        />
      </Card>
    </PageLayout>
  );
};

export default TermsPage;

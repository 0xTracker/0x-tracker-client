import React from 'react';

import { useMetadata } from '../../../hooks';
import Card from '../../../components/card';
import PageLayout from '../../../components/page-layout';
import useTermly from '../hooks/use-termly';

const TermsPage = () => {
  useTermly();
  useMetadata({ title: 'Terms Of Use' });

  return (
    <PageLayout>
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

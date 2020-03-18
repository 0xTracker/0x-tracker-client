import { Helmet } from 'react-helmet';
import React from 'react';

import Card from '../../../components/card';
import PageLayout from '../../../components/page-layout';
import useTermly from '../hooks/use-termly';

const PrivacyPage = () => {
  useTermly();

  return (
    <PageLayout>
      <Helmet>
        <title>Privacy Policy</title>
      </Helmet>
      <Card>
        <div
          data-id="984761bf-6e42-49f3-8d93-39eacc644934"
          data-type="iframe"
          name="termly-embed"
        />
      </Card>
    </PageLayout>
  );
};

export default PrivacyPage;

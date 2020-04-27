import React from 'react';

import { useMetadata } from '../../../hooks';
import Card from '../../../components/card';
import PageLayout from '../../../components/page-layout';
import useTermly from '../hooks/use-termly';

const PrivacyPage = () => {
  useTermly();
  useMetadata({ title: 'Privacy Policy' });

  return (
    <PageLayout>
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

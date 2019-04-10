import { Helmet } from 'react-helmet';
import React from 'react';

import { TIME_PERIOD, URL } from '../../../constants';
import Card from '../../../components/card';
import LoadingIndicator from '../../../components/loading-indicator';
import PageLayout from '../../../components/page-layout';
import RelayerList from './relayer-list';
import useRelayers from '../hooks/use-relayers';

const RelayersPage = () => {
  const [relayers, loadingRelayers, relayersError] = useRelayers();

  if (relayersError) {
    throw relayersError;
  }

  return (
    <>
      <Helmet key="relayers">
        <title>Relayers</title>
      </Helmet>
      <PageLayout
        breadcrumbItems={[{ title: 'Relayers', url: URL.RELAYERS }]}
        title="Relayers"
      >
        <Card fullHeight>
          {loadingRelayers ? (
            <LoadingIndicator centered />
          ) : (
            <RelayerList relayers={relayers} timePeriod={TIME_PERIOD.DAY} />
          )}
        </Card>
      </PageLayout>
    </>
  );
};

export default RelayersPage;

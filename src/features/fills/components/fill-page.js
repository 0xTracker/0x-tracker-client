import { useParams } from 'react-router';
import React from 'react';

import { useMetadata } from '../../../hooks';
import Card from '../../../components/card';
import FillDetails from './fill-details';
import LoadingPage from '../../../components/loading-page';
import PageLayout from '../../../components/page-layout';
import PageNotFound from '../../../components/page-not-found';
import useFill from '../hooks/use-fill';

const FillPage = () => {
  useMetadata({ title: '0x Protocol Fill Details' });

  const { id } = useParams();
  const [fill, loading] = useFill(id);

  if (loading) {
    return <LoadingPage />;
  }

  if (fill === undefined) {
    return <PageNotFound />;
  }

  return (
    <PageLayout title="Fill Details">
      <Card css="padding: 2rem;">
        <FillDetails fill={fill} />
      </Card>
    </PageLayout>
  );
};

export default FillPage;

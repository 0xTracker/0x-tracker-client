import PropTypes from 'prop-types';
import React from 'react';

import { useMetadata } from '../../../hooks';
import Card from '../../../components/card';
import FillDetails from './fill-details';
import LoadingPage from '../../../components/loading-page';
import PageLayout from '../../../components/page-layout';
import PageNotFound from '../../../components/page-not-found';
import useFill from '../hooks/use-fill';

const FillPage = ({ match }) => {
  useMetadata({ title: '0x Protocol Fill Details' });

  const { id: fillId } = match.params;
  const [fill, loading] = useFill(fillId);

  if (loading) {
    return <LoadingPage />;
  }

  if (fill === undefined) {
    return <PageNotFound />;
  }

  return (
    <PageLayout title="Fill Details">
      <Card autoHeight css="padding: 2rem;">
        <FillDetails fill={fill} />
      </Card>
    </PageLayout>
  );
};

FillPage.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string.isRequired,
    }).isRequired,
    url: PropTypes.string.isRequired,
  }).isRequired,
};

export default FillPage;

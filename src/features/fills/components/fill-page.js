import { Helmet } from 'react-helmet';
import PropTypes from 'prop-types';
import React from 'react';

import Card from '../../../components/card';
import FillDetails from './fill-details';
import LoadingPage from '../../../components/loading-page';
import PageLayout from '../../../components/page-layout';
import PageNotFound from '../../../components/page-not-found';
import useFill from '../hooks/use-fill';

const FillPage = ({ match }) => {
  const { id: fillId } = match.params;
  const [fill, loading] = useFill(fillId);

  if (loading) {
    return <LoadingPage />;
  }

  if (fill === undefined) {
    return <PageNotFound />;
  }

  return (
    <>
      <Helmet>
        <title>Fill Details</title>
      </Helmet>
      <PageLayout title="Fill Details">
        <Card css="padding: 2rem;" fullHeight>
          <FillDetails fill={fill} />
        </Card>
      </PageLayout>
    </>
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

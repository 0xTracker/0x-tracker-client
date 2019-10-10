import { compose, mapProps } from 'recompose';
import { Helmet } from 'react-helmet';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import React from 'react';

import Card from '../../../components/card';
import FillDetails from './fill-details';
import LoadingPage from '../../../components/loading-page';
import PageLayout from '../../../components/page-layout';
import PageNotFound from '../../../components/page-not-found';
import useFill from '../hooks/use-fill';

const FillPage = ({ fillId, screenSize }) => {
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
          <FillDetails fill={fill} screenSize={screenSize} />
        </Card>
      </PageLayout>
    </>
  );
};

FillPage.propTypes = {
  fillId: PropTypes.string.isRequired,
  screenSize: PropTypes.shape({
    lessThan: PropTypes.shape({
      sm: PropTypes.bool.isRequired,
    }).isRequired,
  }).isRequired,
};

const enhance = compose(
  mapProps(({ match }) => ({ fillId: match.params.id })),
  connect(state => ({
    screenSize: state.screen,
  })),
);

export default enhance(FillPage);

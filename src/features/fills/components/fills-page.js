import { Helmet } from 'react-helmet';
import PropTypes from 'prop-types';
import React, { useCallback } from 'react';

import { URL } from '../../../constants';
import buildUrl from '../../../util/build-url';
import Card from '../../../components/card';
import Fills from './fills';
import PageLayout from '../../../components/page-layout';

const FillsPage = ({ history, location }) => {
  const params = new URLSearchParams(location.search);
  const page = Number(params.get('page')) || 1;

  const onPageChange = useCallback(newPage => {
    history.push(
      buildUrl(URL.FILLS, {
        page: newPage,
      }),
    );
  }, []);

  return (
    <>
      <Helmet>
        <title>Browse Fills</title>
      </Helmet>
      <PageLayout title="Browse Fills">
        <Card fullHeight>
          <Fills onPageChange={onPageChange} page={page} />
        </Card>
      </PageLayout>
    </>
  );
};

FillsPage.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
  location: PropTypes.shape({
    search: PropTypes.string.isRequired,
  }).isRequired,
};

export default FillsPage;

import _ from 'lodash';
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
  const status = params.get('status');
  const dateFrom = params.get('dateFrom');
  const dateTo = params.get('dateTo');
  const protocolVersion =
    params.get('protocolVersion') === null
      ? null
      : _.toNumber(params.get('protocolVersion'));
  const token = params.get('token');
  const relayer = params.get('relayer');
  const valueFrom = params.get('valueFrom');
  const valueTo = params.get('valueTo');

  const onPageChange = useCallback(newPage => {
    history.push(
      buildUrl(URL.FILLS, {
        dateFrom,
        dateTo,
        page: newPage,
        protocolVersion,
        relayer,
        status,
        token,
        valueFrom,
        valueTo,
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
          <Fills
            filter={{
              dateFrom,
              dateTo,
              protocolVersion,
              relayer,
              status,
              token,
              valueFrom,
              valueTo,
            }}
            onPageChange={onPageChange}
            page={page}
          />
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

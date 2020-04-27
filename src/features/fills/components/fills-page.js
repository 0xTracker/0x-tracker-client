import _ from 'lodash';
import PropTypes from 'prop-types';
import React from 'react';

import { URL } from '../../../constants';
import { buildUrl } from '../../../util';
import { useMetadata } from '../../../hooks';
import Card from '../../../components/card';
import Fills from './fills';
import FillsFilter from './fills-filter';
import PageLayout from '../../../components/page-layout';
import SubTitle from '../../../components/sub-title';

const defaultFilters = {
  protocolVersion: undefined,
  relayer: undefined,
  status: undefined,
  valueFrom: undefined,
  valueTo: undefined,
};

const FillsPage = ({ history, location }) => {
  useMetadata({ title: 'Browse 0x Protocol Fills' });

  const params = new URLSearchParams(location.search);
  const page = Number(params.get('page')) || 1;
  const status = params.get('status') || undefined;
  const dateFrom = params.get('dateFrom');
  const dateTo = params.get('dateTo');
  const protocolVersion =
    params.get('protocolVersion') === null
      ? undefined
      : _.toNumber(params.get('protocolVersion'));
  const token = params.get('token');
  const relayer = params.get('relayer') || undefined;
  const valueFrom = params.get('valueFrom') || undefined;
  const valueTo = params.get('valueTo') || undefined;

  const handlePageChange = (newPage) => {
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
  };

  const handleFiltersChange = (newFilters) => {
    history.push(buildUrl(URL.FILLS, newFilters));
  };

  const selectedFilters = {
    protocolVersion,
    relayer,
    status,
    valueFrom,
    valueTo,
  };

  return (
    <PageLayout
      filter={
        <FillsFilter
          defaultFilters={defaultFilters}
          onChange={handleFiltersChange}
          selectedFilters={selectedFilters}
        />
      }
      title={
        <span>
          Browse Fills
          <SubTitle>from the last 6 months</SubTitle>
        </span>
      }
    >
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
          onPageChange={handlePageChange}
          page={page}
        />
      </Card>
    </PageLayout>
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

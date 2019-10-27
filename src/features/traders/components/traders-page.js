import { Helmet } from 'react-helmet';
import PropTypes from 'prop-types';
import React from 'react';

import { TIME_PERIOD, URL } from '../../../constants';
import buildUrl from '../../../util/build-url';
import PageLayout from '../../../components/page-layout';
import TradersFilter from './traders-filter';
import TopTradersCard from './top-traders-card';
import TradersPageStatWidgets from './traders-page-stat-widgets';

const defaultFilters = {
  statsPeriod: TIME_PERIOD.DAY,
  type: undefined,
};

const TradersPage = ({ history, location }) => {
  const params = new URLSearchParams(location.search);
  const statsPeriod = params.get('statsPeriod') || defaultFilters.statsPeriod;
  const type = params.get('type') || undefined;
  const page = params.get('page') || 1;

  const selectedFilters = {
    statsPeriod,
    type,
  };

  return (
    <>
      <Helmet>
        <title>Top Traders</title>
      </Helmet>
      <PageLayout
        filter={
          <TradersFilter
            defaultFilters={defaultFilters}
            onChange={newFilters => {
              history.push(buildUrl(URL.TRADERS, newFilters));
            }}
            selectedFilters={selectedFilters}
          />
        }
        title="Top Traders"
      >
        <TradersPageStatWidgets
          css="margin-bottom: 2rem;"
          period={statsPeriod}
        />
        <TopTradersCard
          navigateTo={history.push}
          page={page}
          selectedFilters={selectedFilters}
        />
      </PageLayout>
    </>
  );
};

TradersPage.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
  location: PropTypes.shape({
    search: PropTypes.string.isRequired,
  }).isRequired,
};

export default TradersPage;

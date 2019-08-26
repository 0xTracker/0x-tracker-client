import { Helmet } from 'react-helmet';
import PropTypes from 'prop-types';
import React from 'react';

import { TIME_PERIOD, URL } from '../../../constants';
import AsyncTimePeriodSelector from '../../../components/async-time-period-selector';
import Card from '../../../components/card';
import LoadingIndicator from '../../../components/loading-indicator';
import PageLayout from '../../../components/page-layout';
import Paginator from '../../../components/paginator';
import RelayerList from './relayer-list';
import useRelayers from '../hooks/use-relayers';

const RelayersPage = ({ history, location }) => {
  const params = new URLSearchParams(location.search);
  const statsPeriod = params.get('statsPeriod') || TIME_PERIOD.DAY;
  const page = params.get('page') || 1;

  const [relayers, loadingRelayers, relayersError] = useRelayers({
    autoReload: true,
    limit: 50,
    page,
    statsPeriod,
  });

  if (relayersError) {
    throw relayersError;
  }

  const { items, pageCount, pageSize, recordCount } = relayers;

  return (
    <>
      <Helmet key="relayers">
        <title>Active Relayers</title>
      </Helmet>
      <PageLayout
        filter={
          <AsyncTimePeriodSelector
            defaultValue={statsPeriod}
            onChange={newPeriod => {
              history.push(
                `${URL.RELAYERS}?page=${page}&statsPeriod=${newPeriod}`,
              );
            }}
          />
        }
        title="Active Relayers"
      >
        <Card fullHeight>
          {loadingRelayers ? (
            <LoadingIndicator centered />
          ) : (
            <>
              <RelayerList
                positionOffset={(page - 1) * pageSize}
                relayers={items}
              />
              <Paginator
                onPageChange={newPage => {
                  history.push(
                    `${URL.RELAYERS}?page=${newPage}&statsPeriod=${statsPeriod}`,
                  );
                }}
                page={page}
                pageCount={pageCount}
                pageSize={pageSize}
                recordCount={recordCount}
              />
            </>
          )}
        </Card>
      </PageLayout>
    </>
  );
};

RelayersPage.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
  location: PropTypes.shape({
    search: PropTypes.string.isRequired,
  }).isRequired,
};

export default RelayersPage;

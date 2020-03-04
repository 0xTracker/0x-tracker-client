import { Helmet } from 'react-helmet';
import PropTypes from 'prop-types';
import React from 'react';

import { TIME_PERIOD, URL } from '../../../constants';
import { colors } from '../../../styles/constants';
import buildUrl from '../../../util/build-url';
import Card from '../../../components/card';
import Hidden from '../../../components/hidden';
import LoadingIndicator from '../../../components/loading-indicator';
import PageLayout from '../../../components/page-layout';
import Paginator from '../../../components/paginator';
import RelayerList from './relayer-list';
import RelayersFilter from './relayers-filter';
import useRelayers from '../hooks/use-relayers';
import withPagination from '../../../components/with-pagination';

const defaultFilters = {
  statsPeriod: TIME_PERIOD.MONTH,
};

const periodDescriptions = {
  [TIME_PERIOD.DAY]: 'in the last 24 hours',
  [TIME_PERIOD.WEEK]: 'in the last week',
  [TIME_PERIOD.MONTH]: 'in the last month',
  [TIME_PERIOD.YEAR]: 'in the last year',
  [TIME_PERIOD.ALL]: 'from all time',
};

const RelayersPage = ({ history, location, page, setPage }) => {
  const params = new URLSearchParams(location.search);
  const statsPeriod = params.get('statsPeriod') || defaultFilters.statsPeriod;

  const [relayers, loadingRelayers] = useRelayers({
    autoReload: true,
    limit: 50,
    page,
    statsPeriod,
  });

  const { items, pageCount, pageSize, recordCount } = relayers;

  const handleFiltersChange = newFilters => {
    history.push(buildUrl(URL.RELAYERS, newFilters));
  };

  return (
    <>
      <Helmet key="relayers">
        <title>Active Relayers</title>
      </Helmet>
      <PageLayout
        filter={
          <RelayersFilter
            defaultFilters={defaultFilters}
            onChange={handleFiltersChange}
            selectedFilters={{ statsPeriod }}
          />
        }
        title={
          <span>
            Active Relayers
            <Hidden above="xs">
              <small
                css={`
                  color: ${colors.stormGray};
                  display: block;
                  font-size: 0.9rem;
                  text-transform: lowercase;
                `}
              >
                {periodDescriptions[statsPeriod]}
              </small>
            </Hidden>
          </span>
        }
      >
        <Card fullHeight>
          {loadingRelayers ? (
            <LoadingIndicator centered />
          ) : (
            <>
              <RelayerList
                positionOffset={(page - 1) * pageSize}
                relayers={items}
                statsPeriod={statsPeriod}
              />
              <Paginator
                onPageChange={setPage}
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
  page: PropTypes.number.isRequired,
  setPage: PropTypes.func.isRequired,
};

export default withPagination(RelayersPage);

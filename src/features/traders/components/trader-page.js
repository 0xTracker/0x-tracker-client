import { Helmet } from 'react-helmet';
import PropTypes from 'prop-types';
import React, { useCallback } from 'react';

import { TIME_PERIOD } from '../../../constants';
import { media } from '../../../styles/util';
import AddressMetrics from '../../metrics/components/address-metrics';
import Card from '../../../components/card';
import ChartsContainer from '../../../components/charts-container';
import Fills from '../../fills/components/fills';
import PageLayout from '../../../components/page-layout';
import buildUrl from '../../../util/build-url';

const TraderPage = ({ history, location, match }) => {
  const { address } = match.params;
  const params = new URLSearchParams(location.search);
  const page = Number(params.get('page')) || 1;

  const onPageChange = useCallback(newPage => {
    history.push(
      buildUrl(match.url, {
        page: newPage,
      }),
    );
  }, []);

  return (
    <>
      <Helmet>
        <title>{`Trader: ${address}`}</title>
      </Helmet>
      <PageLayout title={`Trader: ${address}`}>
        <ChartsContainer
          charts={[
            {
              component: <AddressMetrics address={address} />,
              title: 'Fill Volume',
            },
            {
              component: (
                <AddressMetrics address={address} keyMetric="fillCount" />
              ),
              title: 'Fill Count',
            },
          ]}
          css={`
            margin: 0 0 1.25em 0;

            ${media.greaterThan('lg')`
              margin: 0 0 2em 0;
            `}
          `}
          defaultPeriod={TIME_PERIOD.YEAR}
          periods={[
            { label: '24H', value: TIME_PERIOD.DAY },
            { label: '7D', value: TIME_PERIOD.WEEK },
            { label: '1M', value: TIME_PERIOD.MONTH },
            { label: '1Y', value: TIME_PERIOD.YEAR },
            { label: 'ALL', value: TIME_PERIOD.ALL },
          ]}
        />
        <Card fullHeight>
          <Fills filter={{ address }} onPageChange={onPageChange} page={page} />
        </Card>
      </PageLayout>
    </>
  );
};

TraderPage.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
  location: PropTypes.shape({
    search: PropTypes.string.isRequired,
  }).isRequired,
  match: PropTypes.shape({
    params: PropTypes.shape({
      address: PropTypes.string.isRequired,
    }).isRequired,
    url: PropTypes.string.isRequired,
  }).isRequired,
};

export default TraderPage;

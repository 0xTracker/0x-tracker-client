import PropTypes from 'prop-types';
import React, { useCallback } from 'react';

import { TIME_PERIOD } from '../../../constants';
import { media } from '../../../styles/util';
import { useMetadata } from '../../../hooks';
import AddressMetrics from '../../metrics/components/address-metrics';
import Blockie from '../../../components/blockie';
import Card from '../../../components/card';
import ChartsContainer from '../../../components/charts-container';
import Fills from '../../fills/components/fills';
import PageLayout from '../../../components/page-layout';
import buildUrl from '../../../util/build-url';

const TraderPage = ({ history, location, match }) => {
  const { address } = match.params;
  const params = new URLSearchParams(location.search);
  const page = Number(params.get('page')) || 1;

  useMetadata({ title: `0x Trading Activity for ${address}` });

  const onPageChange = useCallback((newPage) => {
    history.push(
      buildUrl(match.url, {
        page: newPage,
      }),
    );
  }, []);

  return (
    <PageLayout
      title={
        <div css="display: flex; align-items: center;">
          <Blockie
            css="border-radius: 0.25rem; margin-right: 0.75rem;"
            seed={address}
            size="30px"
          />
          Trader: {address}
        </div>
      }
    >
      <ChartsContainer
        charts={[
          {
            component: <AddressMetrics address={address} />,
            title: 'Volume',
          },
          {
            component: (
              <AddressMetrics address={address} keyMetric="tradeCount" />
            ),
            title: 'Trades',
          },
        ]}
        css={`
          margin: 0 0 1.25em 0;

          ${media.greaterThan('lg')`
              margin: 0 0 2em 0;
            `}
        `}
        defaultPeriod={TIME_PERIOD.MONTH}
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

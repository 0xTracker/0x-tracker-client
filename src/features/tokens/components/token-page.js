import _ from 'lodash';
import { Helmet } from 'react-helmet';
import PropTypes from 'prop-types';
import React, { useCallback } from 'react';

import { TIME_PERIOD } from '../../../constants';
import { media } from '../../../styles/util';
import buildUrl from '../../../util/build-url';
import Card from '../../../components/card';
import ChartsContainer from '../../../components/charts-container';
import Fills from '../../fills/components/fills';
import LoadingPage from '../../../components/loading-page';
import PageLayout from '../../../components/page-layout';
import TokenMetrics from '../../metrics/components/token-metrics';
import TokenPageTitle from './token-page-title';
import useToken from '../hooks/use-token';

const TokenPage = ({ history, location, match }) => {
  const { address: tokenAddress } = match.params;
  const params = new URLSearchParams(location.search);
  const page = Number(params.get('page')) || 1;

  const [token, loadingToken] = useToken(tokenAddress);

  const onPageChange = useCallback((newPage) => {
    history.push(
      buildUrl(match.url, {
        page: newPage,
      }),
    );
  }, []);

  if (loadingToken) {
    return <LoadingPage />;
  }

  return (
    <>
      <Helmet>
        <title>
          {_.has(token, 'name') ? token.name : `Token: ${token.address}`}
        </title>
      </Helmet>
      <PageLayout title={<TokenPageTitle token={token} />}>
        {token ? (
          <ChartsContainer
            charts={[
              {
                component: <TokenMetrics token={token} type="price.close" />,
                title: 'Market Price',
              },
              {
                component: <TokenMetrics token={token} />,
                title: 'Volume',
              },
              {
                component: <TokenMetrics token={token} type="tradeCount" />,
                title: 'Trades',
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
        ) : null}
        <Card fullHeight>
          <Fills
            filter={{ token: tokenAddress }}
            onPageChange={onPageChange}
            page={page}
          />
        </Card>
      </PageLayout>
    </>
  );
};

TokenPage.propTypes = {
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

export default TokenPage;

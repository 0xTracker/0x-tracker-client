import _ from 'lodash';
import { mapProps } from 'recompose';
import { Helmet } from 'react-helmet';
import PropTypes from 'prop-types';
import React from 'react';

import { TIME_PERIOD, URL } from '../../../constants';
import { media } from '../../../styles/util';
import buildTokenUrl from '../util/build-token-url';
import Card from '../../../components/card';
import ChartsContainer from '../../../components/charts-container';
import Fills from '../../fills/components/fills';
import LoadingPage from '../../../components/loading-page';
import PageLayout from '../../../components/page-layout';
import TokenVolume from '../../metrics/components/token-volume';
import useToken from '../hooks/use-token';

const TokenPage = ({ tokenAddress }) => {
  const [token, loadingToken] = useToken(tokenAddress);

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
      <PageLayout
        breadcrumbItems={[
          { title: 'Tokens', url: URL.TOKENS },
          {
            title: _.has(token, 'name') ? token.name : 'Unknown Token',
            url: buildTokenUrl(tokenAddress),
          },
        ]}
        title={_.has(token, 'name') ? token.name : `Token: ${token.address}`}
      >
        {token ? (
          <ChartsContainer
            charts={[
              {
                component: <TokenVolume token={token} />,
                title: 'Network Volume',
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
        <Card css="flex-grow: 1;">
          <Fills filter={{ token: tokenAddress }} />
        </Card>
      </PageLayout>
    </>
  );
};

TokenPage.propTypes = {
  tokenAddress: PropTypes.string.isRequired,
};

export default mapProps(({ match }) => ({
  tokenAddress: match.params.address,
}))(TokenPage);

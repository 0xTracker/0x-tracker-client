import _ from 'lodash';
import { Helmet } from 'react-helmet';
import { useHistory, useParams } from 'react-router';
import { useSearchParam } from 'react-use';
import { Col, Row } from 'reactstrap';
import React from 'react';
import styled from 'styled-components';

import { TIME_PERIOD } from '../../../constants';
import { media } from '../../../styles/util';
import buildTokenUrl from '../util/build-token-url';
import LoadingPage from '../../../components/loading-page';
import PageLayout from '../../../components/page-layout';
import RecentFillsCard from '../../fills/components/recent-fills-card';
import ResponsiveTimePeriodFilter from '../../../components/responsive-time-period-filter';
import TabbedCard from '../../../components/tabbed-card';
import TokenMetrics from '../../metrics/components/token-metrics';
import TokenPageTitle from './token-page-title';
import TokenStats from './token-stats';
import useToken from '../hooks/use-token';

const TokenPageColumn = styled(Col)`
  display: flex;
  flex-direction: column;
  margin-bottom: 1.25rem;

  &:last-child {
    margin-bottom: ${(props) => (props.lastRow ? '0' : '1.25rem')};
  }

  ${media.greaterThan('lg')`
    margin-bottom: ${(props) => (props.lastRow ? '0' : '2rem')};

    &:last-child {
      margin-bottom: ${(props) => (props.lastRow ? '0' : '2rem')};
    }
  `}
`;

const TokenPage = () => {
  const history = useHistory();
  const params = useParams();
  const statsPeriod = useSearchParam('statsPeriod') || TIME_PERIOD.WEEK;
  const [token, loadingToken] = useToken(params.address, { statsPeriod });

  if (loadingToken) {
    return <LoadingPage />;
  }

  return (
    <>
      <Helmet>
        <title>
          {_.isString(token.name) ? token.name : `Token: ${token.address}`}
        </title>
      </Helmet>
      <PageLayout
        filter={
          <ResponsiveTimePeriodFilter
            onChange={(newPeriod) => {
              history.push(
                buildTokenUrl(token.address, { statsPeriod: newPeriod }),
              );
            }}
            value={statsPeriod}
          />
        }
        title={<TokenPageTitle statsPeriod={statsPeriod} token={token} />}
      >
        <TokenStats period={statsPeriod} token={token} />
        <TabbedCard
          css="height: 360px; margin-bottom: 2rem;"
          tabs={[
            {
              component: (
                <TokenMetrics
                  period={statsPeriod}
                  token={token}
                  type="price.close"
                />
              ),
              title: 'Market Price',
            },
            {
              component: <TokenMetrics period={statsPeriod} token={token} />,
              title: 'Volume',
            },
            {
              component: (
                <TokenMetrics
                  period={statsPeriod}
                  token={token}
                  type="tradeCount"
                />
              ),
              title: 'Trades',
            },
          ]}
        />
        <Row>
          <TokenPageColumn css="flex-grow: 1;" lastRow lg={7}>
            <RecentFillsCard
              css="flex-grow: 1;"
              filter={{ token: token.address }}
            />
          </TokenPageColumn>
          <TokenPageColumn css="flex-grow: 1;" lastRow lg={5} />
        </Row>
      </PageLayout>
    </>
  );
};

export default TokenPage;

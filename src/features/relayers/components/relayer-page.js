import { compose, mapProps } from 'recompose';
import { connect } from 'react-redux';
import { Col, Row } from 'reactstrap';
import { Helmet } from 'react-helmet';
import PropTypes from 'prop-types';
import React from 'react';
import styled from 'styled-components';

import { TIME_PERIOD, URL } from '../../../constants';
import { media } from '../../../styles/util';
import buildRelayerUrl from '../util/build-relayer-url';
import Card from '../../../components/card';
import ChartsContainer from '../../../components/charts-container';
import Fills from '../../fills/components/fills';
import getPeriodOptions from '../../../util/get-period-options';
import LoadingPage from '../../../components/loading-page';
import NetworkFees from '../../metrics/components/network-fees';
import NetworkVolume from '../../metrics/components/network-volume';
import PageLayout from '../../../components/page-layout';
import PageNotFound from '../../../components/page-not-found';
import TopRelayerTokens from '../../tokens/components/top-relayer-tokens';
import useRelayer from '../hooks/use-relayer';

const ChartColumn = styled(Col)`
  margin-bottom: 1.25rem;

  ${media.greaterThan('lg')`
    margin-bottom: 2rem;
  `}
`;

const RelayerPage = ({ screenSize, slug }) => {
  const [relayer, loadingRelayer] = useRelayer(slug);

  if (loadingRelayer) {
    return <LoadingPage />;
  }

  if (relayer === undefined) {
    return <PageNotFound />;
  }

  return (
    <>
      <Helmet>
        <title>{relayer.name}</title>
      </Helmet>
      <PageLayout
        breadcrumbItems={[
          { title: 'Relayers', url: URL.RELAYERS },
          { title: relayer.name, url: buildRelayerUrl(relayer) },
        ]}
        title={relayer.name}
      >
        <Row>
          <ChartColumn lg={7}>
            <ChartsContainer
              charts={[
                {
                  component: <NetworkVolume relayerId={relayer.id} />,
                  title: 'Network Volume',
                },
                {
                  component: (
                    <NetworkVolume relayerId={relayer.id} type="fills" />
                  ),
                  title: 'Fills',
                },
                {
                  component: <NetworkFees relayerId={relayer.id} />,
                  title: 'Fees',
                },
              ]}
              defaultPeriod={TIME_PERIOD.MONTH}
              periods={
                screenSize.greaterThan.xs
                  ? getPeriodOptions([
                      TIME_PERIOD.DAY,
                      TIME_PERIOD.WEEK,
                      TIME_PERIOD.MONTH,
                      TIME_PERIOD.YEAR,
                      TIME_PERIOD.ALL,
                    ])
                  : undefined
              }
            />
          </ChartColumn>
          <ChartColumn lg={5}>
            <ChartsContainer
              charts={[
                {
                  component: <TopRelayerTokens relayerId={relayer.id} />,
                  title: 'Top Tokens',
                },
              ]}
              defaultPeriod={TIME_PERIOD.DAY}
              periods={
                screenSize.greaterThan.xs
                  ? getPeriodOptions([
                      TIME_PERIOD.DAY,
                      TIME_PERIOD.WEEK,
                      TIME_PERIOD.MONTH,
                    ])
                  : undefined
              }
            />
          </ChartColumn>
        </Row>
        <Card>
          <Fills
            excludeColumns={['relayer']}
            filter={{ relayer: relayer.id }}
          />
        </Card>
      </PageLayout>
    </>
  );
};

RelayerPage.propTypes = {
  screenSize: PropTypes.object.isRequired,
  slug: PropTypes.string.isRequired,
};

const mapStateToProps = state => ({
  screenSize: state.screen,
});

const enhance = compose(
  mapProps(({ match }) => ({ slug: match.params.slug })),
  connect(mapStateToProps),
);

export default enhance(RelayerPage);

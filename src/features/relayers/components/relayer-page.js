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
import getRelayer from '../selectors/get-relayer';
import LoadingIndicator from '../../../components/loading-indicator';
import NetworkFees from '../../metrics/components/network-fees';
import NetworkVolume from '../../metrics/components/network-volume';
import PageLayout from '../../../components/page-layout';
import relayersPropTypes from '../prop-types';
import TopTokens from '../../tokens/components/top-tokens';
import withRelayers from './with-relayers';

const ChartColumn = styled(Col)`
  margin-bottom: 1.25rem;

  ${media.greaterThan('lg')`
    margin-bottom: 2rem;
  `}
`;

const RelayerPage = ({ relayer, screenSize }) =>
  relayer === undefined ? (
    <LoadingIndicator centered />
  ) : (
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
                  title: 'Network Volume',
                  component: <NetworkVolume relayerId={relayer.id} />,
                },
                {
                  title: 'Fills',
                  component: (
                    <NetworkVolume relayerId={relayer.id} type="fills" />
                  ),
                },
                {
                  title: 'Fees',
                  component: <NetworkFees relayerId={relayer.id} />,
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
                  title: 'Top Tokens',
                  component: <TopTokens relayerId={relayer.id} />,
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

RelayerPage.propTypes = {
  relayer: relayersPropTypes.relayer,
  screenSize: PropTypes.object.isRequired,
};

RelayerPage.defaultProps = {
  relayer: undefined,
};

const mapStateToProps = (state, ownProps) => ({
  relayer: getRelayer(state, ownProps),
  screenSize: state.screen,
});

const enhance = compose(
  withRelayers,
  mapProps(({ match }) => ({ relayerSlug: match.params.slug })),
  connect(mapStateToProps),
);

export default enhance(RelayerPage);

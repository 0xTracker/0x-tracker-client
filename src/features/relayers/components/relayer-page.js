import { compose, mapProps } from 'recompose';
import { connect } from 'react-redux';
import { Col, Row } from 'reactstrap';
import React from 'react';

import { TIME_PERIOD, URL } from '../../../constants';
import buildRelayerUrl from '../util/build-relayer-url';
import Card from '../../../components/card';
import ChartsContainer from '../../../components/charts-container';
import Fills from '../../fills/components/fills';
import getPeriodOptions from '../../../util/get-period-options';
import getRelayer from '../selectors/get-relayer';
import NetworkFees from '../../metrics/components/network-fees';
import NetworkVolume from '../../metrics/components/network-volume';
import PageLayout from '../../../components/page-layout';
import relayersPropTypes from '../prop-types';
import TopTokens from '../../tokens/components/top-tokens';
import withRelayers from './with-relayers';

const RelayerPage = ({ relayer }) =>
  relayer === undefined ? null : (
    <PageLayout
      breadcrumbItems={[
        { title: 'Relayers', url: URL.RELAYERS },
        { title: relayer.name, url: buildRelayerUrl(relayer) },
      ]}
      title={relayer.name}
    >
      <Row css="margin-bottom: 2rem;">
        <Col lg={7}>
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
            periods={getPeriodOptions([
              TIME_PERIOD.DAY,
              TIME_PERIOD.WEEK,
              TIME_PERIOD.MONTH,
              TIME_PERIOD.YEAR,
              TIME_PERIOD.ALL,
            ])}
          />
        </Col>
        <Col lg={5}>
          <ChartsContainer
            charts={[
              {
                title: 'Top Tokens',
                component: <TopTokens relayerId={relayer.id} />,
              },
            ]}
            defaultPeriod={TIME_PERIOD.DAY}
            periods={getPeriodOptions([
              TIME_PERIOD.DAY,
              TIME_PERIOD.WEEK,
              TIME_PERIOD.MONTH,
            ])}
          />
        </Col>
      </Row>
      <Card>
        <Fills excludeColumns={['relayer']} filter={{ relayer: relayer.id }} />
      </Card>
    </PageLayout>
  );

RelayerPage.propTypes = {
  relayer: relayersPropTypes.relayer,
};

RelayerPage.defaultProps = {
  relayer: undefined,
};

const mapStateToProps = (state, ownProps) => ({
  relayer: getRelayer(state, ownProps),
});

const enhance = compose(
  withRelayers,
  mapProps(({ match }) => ({ relayerSlug: match.params.slug })),
  connect(mapStateToProps),
);

export default enhance(RelayerPage);

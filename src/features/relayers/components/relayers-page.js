import { compose } from 'recompose';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import React from 'react';

import { TIME_PERIOD, URL } from '../../../constants';
import Card from '../../../components/card';
import getRelayersWithStats from '../selectors/get-relayers-with-stats';
import LoadingIndicator from '../../../components/loading-indicator';
import PageLayout from '../../../components/page-layout';
import RelayerList from './relayer-list';
import relayersPropTypes from '../prop-types';
import withConversionRate from '../../currencies/components/with-conversion-rate';
import withRelayerStats from '../../stats/components/with-relayer-stats';
import withRelayers from './with-relayers';

const RelayersPage = ({ relayers }) => (
  <PageLayout
    breadcrumbItems={[{ title: 'Relayers', url: URL.RELAYERS }]}
    title="Relayers"
  >
    <Card fullHeight>
      {relayers === undefined ? (
        <LoadingIndicator centered />
      ) : (
        <RelayerList relayers={relayers} timePeriod={TIME_PERIOD.DAY} />
      )}
    </Card>
  </PageLayout>
);

RelayersPage.propTypes = {
  relayers: PropTypes.arrayOf(relayersPropTypes.relayerWithStats),
};

RelayersPage.defaultProps = {
  relayers: undefined,
};

const mapStateToProps = state => ({
  relayers: getRelayersWithStats(state, { period: TIME_PERIOD.DAY }),
});

const enhance = compose(
  withRelayers,
  withRelayerStats,
  withConversionRate,
  connect(mapStateToProps),
);

export default enhance(RelayersPage);

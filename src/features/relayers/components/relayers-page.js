import { compose } from 'recompose';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import React from 'react';

import { TIME_PERIOD, URL } from '../../../constants';
import ContentHeader from '../../../components/content-header';
import ContentSection from '../../../components/content-section';
import getRelayersWithStats from '../selectors/get-relayers-with-stats';
import LoadingIndicator from '../../../components/loading-indicator';
import RelayerList from './relayer-list';
import relayersPropTypes from '../prop-types';
import withConversionRate from '../../currencies/components/with-conversion-rate';
import withRelayerStats from '../../stats/components/with-relayer-stats';
import withRelayers from './with-relayers';

const RelayersPage = ({ relayers }) => (
  <React.Fragment>
    <ContentHeader
      breadcrumbItems={[{ title: 'Relayers', url: URL.RELAYERS }]}
      title="Relayers"
    />
    <ContentSection>
      {relayers === undefined ? (
        <LoadingIndicator centered />
      ) : (
        <RelayerList relayers={relayers} timePeriod={TIME_PERIOD.DAY} />
      )}
    </ContentSection>
  </React.Fragment>
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

import { connect } from 'react-redux';
import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import getRelayers from '../selectors/get-relayers';
import relayersPropTypes from '../prop-types';

const withRelayers = WrappedComponent => {
  class WithRelayersHOC extends PureComponent {
    componentDidMount() {
      const { fetchRelayers, relayers } = this.props;

      if (relayers === undefined) {
        fetchRelayers();
      }
    }

    render() {
      return <WrappedComponent {...this.props} />;
    }
  }

  WithRelayersHOC.propTypes = {
    fetchRelayers: PropTypes.func.isRequired,
    relayers: PropTypes.arrayOf(relayersPropTypes.relayer),
  };

  WithRelayersHOC.defaultProps = {
    relayers: undefined,
  };

  const mapStateToProps = state => ({
    relayers: getRelayers(state),
  });

  const mapDispatchToProps = dispatch => ({
    fetchRelayers: dispatch.relayers.fetch,
  });

  return connect(
    mapStateToProps,
    mapDispatchToProps,
  )(WithRelayersHOC);
};

export default withRelayers;

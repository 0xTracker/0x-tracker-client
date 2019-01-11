import _ from 'lodash';
import { connect } from 'react-redux';
import { PureComponent } from 'react';
import PropTypes from 'prop-types';

import callApi from '../../../util/call-api';

class FillsProvider extends PureComponent {
  state = { pageCount: 0, reloading: false };

  componentDidMount() {
    this.fetchFills().catch(error => {
      this.setState({ error });
    });
  }

  componentDidUpdate(prevProps) {
    const { autoReloadKey, filter, page } = this.props;

    const filterChanged = !_.isEqual(filter, prevProps.filter);
    const pageChanged = page !== prevProps.page;
    const reload = autoReloadKey !== prevProps.autoReloadKey;

    if (!filterChanged && !pageChanged && !reload) {
      return;
    }

    if (filterChanged) {
      this.setState({ fills: undefined }); // eslint-disable-line react/no-did-update-set-state
    }

    this.fetchFills(reload).catch(error => {
      if (autoReloadKey === prevProps.autoReloadKey) {
        this.setState({ error });
      } else {
        // TODO: Log error
      }
    });
  }

  async fetchFills(reload = false) {
    const { filter, page } = this.props;
    const { address, relayer, token } = filter;

    if (reload) {
      this.setState({ reloading: true });
    } else {
      this.setState({ loading: true });
    }

    const { fills, pageCount } = await callApi('fills', {
      page,
      q: address,
      relayer,
      token,
    });

    this.setState({
      fills,
      loading: false,
      pageCount,
      reloading: false,
    });
  }

  render() {
    const { children } = this.props;
    const { error, pageCount, fills, loading, reloading } = this.state;

    if (error) {
      throw error;
    }

    return children({
      changingPage: loading && fills !== undefined,
      fills,
      loading: fills === undefined,
      pageCount,
      reloading,
    });
  }
}

FillsProvider.propTypes = {
  autoReloadKey: PropTypes.string,
  children: PropTypes.func.isRequired,
  filter: PropTypes.shape({
    address: PropTypes.string,
    token: PropTypes.string,
  }),
  page: PropTypes.number,
};

FillsProvider.defaultProps = {
  autoReloadKey: undefined,
  filter: {},
  page: 1,
};

const mapStateToProps = state => ({
  autoReloadKey: state.autoReload.key,
});

export default connect(mapStateToProps)(FillsProvider);

import _ from 'lodash';
import { PureComponent } from 'react';
import PropTypes from 'prop-types';

import callApi from '../../../util/call-api';
import AutoReload from '../../../util/auto-reload';

class FillsProvider extends PureComponent {
  state = { pageCount: 0, reloading: false };

  componentDidMount() {
    this.fetchFills()
      // eslint-disable-next-line promise/prefer-await-to-then
      .then(() => {
        AutoReload.addListener(this.reloadFills);

        return undefined;
      })
      .catch(error => {
        this.setState({ error });
      });
  }

  componentDidUpdate(prevProps) {
    const { filter, page } = this.props;

    const filterChanged = !_.isEqual(filter, prevProps.filter);
    const pageChanged = page !== prevProps.page;

    if (!filterChanged && !pageChanged) {
      return;
    }

    if (filterChanged) {
      this.setState({ fills: undefined }); // eslint-disable-line react/no-did-update-set-state
    }

    this.fetchFills().catch(error => {
      this.setState({ error });
    });
  }

  componentWillUnmount() {
    AutoReload.removeListener(this.reloadFills);
  }

  reloadFills = () => {
    this.fetchFills(true).catch(() => {
      // TODO: Log error
    });
  };

  fetchFills = async (reload = false) => {
    const { filter, limit, page } = this.props;
    const { address, relayer, token } = filter;

    if (reload) {
      this.setState({ reloading: true });
    } else {
      this.setState({ loading: true });
    }

    const { fills, limit: pageSize, pageCount, total } = await callApi(
      'fills',
      {
        limit,
        page,
        q: address,
        relayer,
        token,
      },
    );

    this.setState({
      fills,
      loading: false,
      pageCount,
      pageSize,
      reloading: false,
      total,
    });
  };

  render() {
    const { children } = this.props;
    const {
      error,
      pageCount,
      fills,
      loading,
      pageSize,
      reloading,
      total,
    } = this.state;

    if (error) {
      throw error;
    }

    return children({
      changingPage: loading && fills !== undefined,
      fills,
      loading: fills === undefined,
      pageCount,
      pageSize,
      reloading,
      total,
    });
  }
}

FillsProvider.propTypes = {
  children: PropTypes.func.isRequired,
  filter: PropTypes.shape({
    address: PropTypes.string,
    token: PropTypes.string,
  }),
  limit: PropTypes.number,
  page: PropTypes.number,
};

FillsProvider.defaultProps = {
  filter: {},
  limit: undefined,
  page: 1,
};

export default FillsProvider;

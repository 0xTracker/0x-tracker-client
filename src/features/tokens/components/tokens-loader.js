import { PureComponent } from 'react';
import PropTypes from 'prop-types';

import AutoReload from '../../../util/auto-reload';
import callApi from '../../../util/call-api';

class TokensLoader extends PureComponent {
  state = { loading: true, pageCount: 0, reloading: false };

  componentDidMount() {
    this.fetchTokens()
      // eslint-disable-next-line promise/prefer-await-to-then
      .then(() => {
        AutoReload.addListener(this.reloadData);

        return undefined;
      })
      .catch(error => {
        this.setState({ error });
      });
  }

  componentDidUpdate(prevProps) {
    const { page } = this.props;

    if (page === prevProps.page) {
      return;
    }

    this.fetchTokens().catch(error => {
      this.setState({ error });
    });
  }

  async reloadData() {
    this.fetchTokens(true).catch(error => {
      console.error(error);
      // TODO: Log error
    });
  }

  async fetchTokens(reload = false) {
    const { limit, page } = this.props;

    if (reload) {
      this.setState({ reloading: true });
    } else {
      this.setState({ loading: true });
    }

    const {
      limit: pageSize,
      page: loadedPage,
      pageCount,
      tokens,
      total: recordCount,
    } = await callApi(
      'tokens',
      {
        limit,
        page,
      },
      { version: 2 },
    );

    this.setState({
      loadedPage,
      loading: false,
      pageCount,
      pageSize,
      recordCount,
      reloading: false,
      tokens,
    });
  }

  render() {
    const { children } = this.props;
    const {
      error,
      pageCount,
      loadedPage,
      loading,
      pageSize,
      recordCount,
      reloading,
      tokens,
    } = this.state;

    if (error) {
      throw error;
    }

    return children({
      loadedPage,
      loading,
      pageCount,
      pageSize,
      recordCount,
      reloading,
      tokens,
    });
  }
}

TokensLoader.propTypes = {
  children: PropTypes.func.isRequired,
  limit: PropTypes.number,
  page: PropTypes.number,
};

TokensLoader.defaultProps = {
  limit: undefined,
  page: 1,
};

export default TokensLoader;

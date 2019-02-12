import { connect } from 'react-redux';
import { PureComponent } from 'react';
import PropTypes from 'prop-types';

import callApi from '../../../util/call-api';

class TokensLoader extends PureComponent {
  state = { loading: true, pageCount: 0, reloading: false };

  componentDidMount() {
    this.fetchTokens().catch(error => {
      this.setState({ error });
    });
  }

  componentDidUpdate(prevProps) {
    const { autoReloadKey, page } = this.props;

    const pageChanged = page !== prevProps.page;
    const reload = autoReloadKey !== prevProps.autoReloadKey;

    if (!pageChanged && !reload) {
      return;
    }

    this.fetchTokens(reload).catch(error => {
      if (autoReloadKey === prevProps.autoReloadKey) {
        this.setState({ error });
      } else {
        // TODO: Log error
      }
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
  autoReloadKey: PropTypes.string,
  children: PropTypes.func.isRequired,
  limit: PropTypes.number,
  page: PropTypes.number,
};

TokensLoader.defaultProps = {
  autoReloadKey: undefined,
  limit: undefined,
  page: 1,
};

const mapStateToProps = state => ({
  autoReloadKey: state.autoReload.key,
});

export default connect(mapStateToProps)(TokensLoader);

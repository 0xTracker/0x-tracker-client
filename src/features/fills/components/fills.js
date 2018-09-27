import _ from 'lodash';
import { compact, flow, join } from 'lodash/fp';
import { connect } from 'react-redux';
import { StyleSheet, css } from 'aphrodite';
import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import Scroll from 'react-scroll';

import FillList from './fill-list';
import LoadingIndicator from '../../../components/loading-indicator';
import Paginator from '../../../components/paginator';

const styles = StyleSheet.create({
  footer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    margin: '15px 0 0 0',
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    margin: '0 0 15px 0',
    alignItems: 'center',
  },
  paginator: {
    display: 'flex',
    alignItems: 'center',
  },
  spinner: {
    marginRight: '15px',
  },
});

class Fills extends PureComponent {
  constructor() {
    super();

    this.handlePageChange = this.handlePageChange.bind(this);
    this.handlePageChangeBottom = this.handlePageChangeBottom.bind(this);
    this.state = {
      changingPage: false,
      page: 1,
      pageCount: 0,
      resultCount: 0,
    };
  }

  async componentDidMount() {
    const { filter } = this.props;
    const { page } = this.state;

    await this.fetchFills({
      filter,
      page,
    });
  }

  async componentDidUpdate(prevProps, prevState) {
    const { changingPage, page, scrollTop, fills } = this.state;
    const { autoReloadKey, filter } = this.props;

    const filterUpdated = !_.isEqual(filter, prevProps.filter);
    const pageChanged = prevState.page !== page;
    const fillsChanged = prevState.fills !== fills;
    const reload = prevProps.autoReloadKey !== autoReloadKey;

    if (filterUpdated) {
      this.setState({ page: 1, fills: undefined }); // eslint-disable-line react/no-did-update-set-state
    }

    if (fillsChanged && changingPage) {
      this.setState({ changingPage: false }); // eslint-disable-line react/no-did-update-set-state

      if (scrollTop) {
        Scroll.animateScroll.scrollToTop({ duration: 500 });
        this.setState({ scrollTop: false }); // eslint-disable-line react/no-did-update-set-state
      }
    }

    if (pageChanged) {
      this.setState({ changingPage: true }); // eslint-disable-line react/no-did-update-set-state
    }

    if (reload || filterUpdated || pageChanged) {
      await this.fetchFills({
        filter,
        page,
      });
    }
  }

  async fetchFills({ filter, page }) {
    const { address, relayer, token } = filter;
    const url = flow(
      compact,
      join('&'),
    )([
      `${process.env.REACT_APP_API_ENDPOINT}/fills?page=${page}`,
      _.isString(address) && `q=${address}`,
      _.isString(relayer) && `relayer=${relayer}`,
      _.isString(token) && `token=${token}`,
    ]);
    const response = await fetch(url);
    const result = await response.json();
    const { pageCount, fills, total } = result;

    this.setState({
      fills,
      pageCount,
      resultCount: total,
    });
  }

  handlePageChange(newPage) {
    this.setState({ page: newPage });
  }

  handlePageChangeBottom(newPage) {
    this.setState({ page: newPage, scrollTop: true });
  }

  render() {
    const { excludeColumns, filter, heading, showStatus } = this.props;
    const { changingPage, page, pageCount, fills, resultCount } = this.state;

    return (
      <div>
        {_.isString(heading) && (
          <div className={css(styles.header)}>
            <h4>{heading}</h4>
            <Paginator
              changingPage={changingPage}
              onPageChange={this.handlePageChange}
              page={page}
              pageCount={pageCount}
            />
          </div>
        )}
        {fills !== undefined &&
          _.has(filter, 'address') && (
            <div className="mb-5">
              <p className="lead text-center">
                {resultCount || 'No'} results found for <br />
                <strong>{filter.address}</strong>
              </p>
            </div>
          )}
        {fills === undefined && <LoadingIndicator isCentered />}
        {fills !== undefined &&
          fills.length > 0 && (
            <FillList {...{ excludeColumns, showStatus, fills }} />
          )}
        <Paginator
          changingPage={changingPage}
          onPageChange={this.handlePageChangeBottom}
          page={page}
          pageCount={pageCount}
        />
      </div>
    );
  }
}

Fills.propTypes = {
  autoReloadKey: PropTypes.string,
  excludeColumns: PropTypes.arrayOf(PropTypes.oneOf(['relayer'])),
  filter: PropTypes.shape({
    address: PropTypes.string,
    token: PropTypes.string,
  }),
  heading: PropTypes.string,
  showStatus: PropTypes.bool,
};

Fills.defaultProps = {
  autoReloadKey: undefined,
  excludeColumns: [],
  filter: {},
  heading: undefined,
  showStatus: false,
};

const mapStateToProps = state => ({
  autoReloadKey: state.autoReload.key,
});

export default connect(mapStateToProps)(Fills);

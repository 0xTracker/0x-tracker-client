import _ from 'lodash';
import { compact, flow, join } from 'lodash/fp';
import { connect } from 'react-redux';
import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import Scroll from 'react-scroll';
import styled from 'styled-components';

import FillList from './fill-list';
import LoadingIndicator from '../../../components/loading-indicator';
import Paginator from '../../../components/paginator';

const FillsHeader = styled.div`
  align-items: center;
  display: flex;
  justify-content: space-between;
  margin: 0 0 15px 0;
`;

const FillsHeading = styled.h4`
  margin: 0;
`;

class Fills extends PureComponent {
  constructor() {
    super();

    this.handlePageChange = this.handlePageChange.bind(this);
    this.handlePageChangeBottom = this.handlePageChangeBottom.bind(this);
    this.state = {
      changingPage: false,
      page: 1,
      pageCount: 0,
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
    const { pageCount, fills } = result;

    this.setState({
      fills,
      pageCount,
    });
  }

  handlePageChange(newPage) {
    this.setState({ page: newPage });
  }

  handlePageChangeBottom(newPage) {
    this.setState({ page: newPage, scrollTop: true });
  }

  render() {
    const { excludeColumns, heading, showStatus } = this.props;
    const { changingPage, page, pageCount, fills } = this.state;

    return (
      <>
        {_.isString(heading) && (
          <FillsHeader>
            <FillsHeading>{heading}</FillsHeading>
          </FillsHeader>
        )}
        {fills === undefined && <LoadingIndicator centered />}
        {fills !== undefined && fills.length > 0 && (
          <FillList {...{ excludeColumns, showStatus, fills }} />
        )}
        <Paginator
          changingPage={changingPage}
          css="margin: 16px"
          onPageChange={this.handlePageChangeBottom}
          page={page}
          pageCount={pageCount}
        />
      </>
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

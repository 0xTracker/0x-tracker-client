import _ from 'lodash';
import PropTypes from 'prop-types';
import React from 'react';

import callApi from '../../../util/call-api';

class ArticlesProvider extends React.Component {
  state = { isLoading: false, page: 1 };

  async componentDidMount() {
    const { page } = this.state;

    this.fetchData(page);
  }

  handleLoadMore = event => {
    const { page } = this.state;

    event.preventDefault();
    this.fetchData(page + 1);
  };

  fetchData = async page => {
    this.setState({ isLoading: true });

    const data = await callApi('articles', { page });

    this.setState(prevState => ({
      articles: _.isArray(prevState.articles)
        ? prevState.articles.concat(data.articles)
        : data.articles,
      isLoading: false,
      page: data.page,
      pageCount: data.pageCount,
    }));
  };

  render() {
    const { articles, isLoading, page, pageCount } = this.state;
    const { children, limit } = this.props;

    return children({
      articles: limit ? _.take(articles, limit) : articles,
      canLoadMore: page < pageCount,
      loadingInitial: articles === undefined,
      loadingMore: isLoading && articles !== undefined,
      loadMore: this.handleLoadMore,
    });
  }
}

ArticlesProvider.propTypes = {
  children: PropTypes.node.isRequired,
  limit: PropTypes.number,
};

ArticlesProvider.defaultProps = {
  limit: undefined,
};

export default ArticlesProvider;

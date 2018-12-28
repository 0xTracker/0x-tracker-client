import _ from 'lodash';
import React, { Component } from 'react';
import styled from 'styled-components';

import { colors } from '../../../styles/constants';
import Article from './article';
import callApi from '../../../util/call-api';
import LoadingIndicator from '../../../components/loading-indicator';

const LoadMoreButton = styled.button`
  align-items: center;
  background-color: ${colors.athensGray};
  border: none;
  border-radius: 3px;
  color: currentColor;
  cursor: pointer;
  display: flex;
  justify-content: center;
  padding: 1em 0;

  &:hover {
    background-color: ${colors.santasGray};
    color: ${colors.white};
  }
`;

class ArticleList extends Component {
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

    if (articles === undefined) {
      return <LoadingIndicator centered />;
    }

    return (
      <React.Fragment>
        {articles.map(article => (
          <Article article={article} key={article.id} />
        ))}
        {page < pageCount && (
          <LoadMoreButton onClick={this.handleLoadMore}>
            {isLoading ? (
              <LoadingIndicator color="light" size="small" type="cylon" />
            ) : (
              'Load More Stories'
            )}
          </LoadMoreButton>
        )}
      </React.Fragment>
    );
  }
}

export default ArticleList;

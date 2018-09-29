import _ from 'lodash';
import { connect } from 'react-redux';
import React, { Component } from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';

import Article from './article';
import callApi from '../../../util/call-api';
import Link from '../../../components/link';
import LoadingIndicator from '../../../components/loading-indicator';

class ArticleList extends Component {
  constructor() {
    super();

    this.state = { page: 1 };
    this.fetchData = this.fetchData.bind(this);
    this.handleLoadMore = this.handleLoadMore.bind(this);
  }

  async componentDidMount() {
    const { page } = this.state;

    this.fetchData(page);
  }

  handleLoadMore(event) {
    const { page } = this.state;

    event.preventDefault();
    this.fetchData(page + 1);
  }

  async fetchData(page) {
    const data = await callApi('articles', { page });

    this.setState(prevState => ({
      articles: _.isArray(prevState.articles)
        ? prevState.articles.concat(data.articles)
        : data.articles,
      page: data.page,
      pageCount: data.pageCount,
    }));
  }

  render() {
    const { articles, page, pageCount } = this.state;
    const { screen } = this.props;

    if (articles === undefined) {
      return <LoadingIndicator isCentered />;
    }

    let deckSize = 3;
    if (screen.lessThan.medium) {
      deckSize = 1;
    } else if (screen.is.medium) {
      deckSize = 2;
    }

    const chunkedArticles = _.chunk(articles, deckSize);

    return (
      <div>
        <div className="mt-2 mb-4">
          <p className="lead">
            Keep up to date with the most important 0x ecosystem news and
            updates in one place.
          </p>
        </div>

        {chunkedArticles.map((articlesChunk, chunk) => (
          <div
            className={classNames({
              'card-deck': true,
              'mb-1': deckSize === 1,
              'mb-4': deckSize > 1,
            })}
            key={chunk} // eslint-disable-line react/no-array-index-key
          >
            {articlesChunk.map(article => (
              <Article article={article} key={article.id} />
            ))}
          </div>
        ))}
        {page < pageCount && (
          <p>
            <Link
              className="btn btn-outline-dark btn-lg btn-block"
              onClick={this.handleLoadMore}
            >
              Load More Stories
            </Link>
          </p>
        )}
      </div>
    );
  }
}

ArticleList.propTypes = {
  screen: PropTypes.object.isRequired,
};

export default connect(state => ({ screen: state.screen }))(ArticleList);

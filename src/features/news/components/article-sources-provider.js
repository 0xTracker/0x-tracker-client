import PropTypes from 'prop-types';
import React from 'react';

import callApi from '../../../util/call-api';

class ArticleSourcesProvider extends React.PureComponent {
  state = {};

  async componentDidMount() {
    this.fetchData();
  }

  fetchData = async () => {
    const sources = await callApi('article-sources');

    this.setState({
      sources,
    });
  };

  render() {
    const { sources } = this.state;
    const { children } = this.props;

    return children({
      loading: sources === undefined,
      sources,
    });
  }
}

ArticleSourcesProvider.propTypes = {
  children: PropTypes.func.isRequired,
};

export default ArticleSourcesProvider;

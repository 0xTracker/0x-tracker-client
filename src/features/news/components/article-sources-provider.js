import PropTypes from 'prop-types';

import useApi from '../../../hooks/use-api';

const ArticleSourcesProvider = ({ children }) => {
  const { error, loading, response } = useApi('article-sources', {
    autoReload: true,
  });

  if (error) {
    throw error;
  }

  return children({
    loading,
    sources: response,
  });
};

ArticleSourcesProvider.propTypes = {
  children: PropTypes.func.isRequired,
};

export default ArticleSourcesProvider;

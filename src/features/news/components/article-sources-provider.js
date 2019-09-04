import PropTypes from 'prop-types';

import useApi from '../../../hooks/use-api';

const ArticleSourcesProvider = ({ children }) => {
  const [sources, loading] = useApi('article-sources', {
    autoReload: true,
  });

  return children({
    loading,
    sources,
  });
};

ArticleSourcesProvider.propTypes = {
  children: PropTypes.func.isRequired,
};

export default ArticleSourcesProvider;

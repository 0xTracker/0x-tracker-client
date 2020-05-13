import useApi from '../../../hooks/use-api';

const useArticleSources = () =>
  useApi('article-sources', {
    autoReload: false,
  });

export default useArticleSources;

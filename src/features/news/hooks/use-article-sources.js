import useApi from '../../../hooks/use-api';

const useArticleSources = () =>
  useApi('article-sources', {
    autoReload: true,
  });

export default useArticleSources;

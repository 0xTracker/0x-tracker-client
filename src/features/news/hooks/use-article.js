import useApi from '../../../hooks/use-api';

const useArticle = (source, slug) => useApi(`articles/${source}/${slug}`);

export default useArticle;

import useApi from '../../../hooks/use-api';

const useArticle = (id) => useApi(`articles/${id}`);

export default useArticle;

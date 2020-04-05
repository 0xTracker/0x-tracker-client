import useApi from '../../../hooks/use-api';

const useFill = (fillId) => useApi(`fills/${fillId}`);

export default useFill;

import { useSearchParam as useSearchParamBase } from 'react-use';

const useSearchParam = (
  name,
  defaultValue,
  { isArray } = { isArray: false },
) => {
  const value = useSearchParamBase(name);

  if (value === null) {
    return defaultValue;
  }

  if (isArray) {
    return value.split(',');
  }

  return value;
};

export default useSearchParam;

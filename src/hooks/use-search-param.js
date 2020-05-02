import { useSearchParam as useSearchParamBase } from 'react-use';

const useSearchParam = (name, defaultValue) => {
  const value = useSearchParamBase(name);

  if (value === null) {
    return defaultValue;
  }

  return value;
};

export default useSearchParam;

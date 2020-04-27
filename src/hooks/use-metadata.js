import { useTitle } from 'react-use';

const useMetadata = (metadata) => {
  useTitle(
    metadata.title === undefined
      ? '0x Tracker'
      : `${metadata.title} | 0x Tracker`,
  );
};

export default useMetadata;

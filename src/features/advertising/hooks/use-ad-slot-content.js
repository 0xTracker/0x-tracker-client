import { useEffect, useState } from 'react';

import { callApi } from '../../../util';

const useAdSlotContent = (tokenAddress, tokenId) => {
  const [content, setContent] = useState();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    setContent(undefined);
    callApi(`ad-slots/${tokenAddress}/${tokenId}`)
      .then((response) => {
        setContent(response);
        setLoading(false);
      })
      .catch((error) => {
        if (error.response !== undefined && error.response.status === 404) {
          setLoading(false);

          return;
        }

        throw error;
      });
  }, [tokenAddress, tokenId]);

  return [content, loading];
};

export default useAdSlotContent;

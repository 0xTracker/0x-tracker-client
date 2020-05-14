import { ethers } from 'ethers';
import { useWallet } from 'use-wallet';
import { useEffect, useState } from 'react';
import axios from 'axios';

import { callApi } from '../../../util';
import buildApiUrl from '../../../util/build-api-url';

const useAdSlotContent = (tokenAddress, tokenId) => {
  const [content, setContent] = useState();
  const [loading, setLoading] = useState(true);
  const wallet = useWallet();

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

  const submitContent = async (submission) => {
    const provider = new ethers.providers.Web3Provider(wallet.ethereum);
    const message = JSON.stringify(submission);
    const signature = await provider.getSigner().signMessage(message);
    const url = buildApiUrl(`ad-slots/${tokenAddress}/${tokenId}`);

    const response = await axios.patch(url, {
      message,
      signature,
    });

    setContent(response.data);
  };

  return [content, loading, submitContent];
};

export default useAdSlotContent;

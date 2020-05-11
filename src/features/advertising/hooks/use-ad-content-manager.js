import { ethers } from 'ethers';
import { useWallet } from 'use-wallet';
import axios from 'axios';

import buildApiUrl from '../../../util/build-api-url';

const useAdContentManager = (tokenAddress, tokenId) => {
  const wallet = useWallet();

  const submitContent = async (submission) => {
    const provider = new ethers.providers.Web3Provider(wallet.ethereum);
    const message = JSON.stringify(submission);
    const signature = await provider.getSigner().signMessage(message);
    const url = buildApiUrl(`ad-slots/${tokenAddress}/${tokenId}`);

    await axios.patch(url, {
      message,
      signature,
    });
  };

  return submitContent;
};

export default useAdContentManager;

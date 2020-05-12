import { useEffect, useState } from 'react';
import { ethers } from 'ethers';

import * as Microsponsors from '../util/microsponsors';

const UseAdvertisingSlots = (wallet) => {
  const [tokens, setTokens] = useState([]);
  const [loading, setLoading] = useState(false);
  const ownerAddress = wallet.account;

  useEffect(() => {
    if (
      ownerAddress === undefined ||
      wallet.connected === false ||
      wallet.ethereum === undefined
    ) {
      return;
    }

    setLoading(true);

    const provider = new ethers.providers.Web3Provider(wallet.ethereum);

    Microsponsors.getTokensOfOwner(ownerAddress, provider)
      .then((tokenIds) =>
        Promise.all(
          tokenIds.map((tokenId) =>
            Microsponsors.getTokenMetadata(tokenId, provider),
          ),
        ),
      )
      .then((newTokens) => {
        setTokens(newTokens.filter((token) => token.slotEndTime >= Date.now()));
        setLoading(false);
      })
      .catch(console.error);
  }, [ownerAddress, wallet.connected]);

  return [tokens, loading];
};

export default UseAdvertisingSlots;

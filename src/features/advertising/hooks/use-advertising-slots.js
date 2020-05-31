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
        // eslint-disable-next-line compat/compat
        Promise.all(
          tokenIds.map((tokenId) =>
            Microsponsors.getTokenMetadata(tokenId, provider),
          ),
        ),
      )
      .then((newTokens) => {
        setTokens(
          newTokens.filter(
            (token) =>
              token.minter.toLowerCase() ===
                '0x56d9fb185343ff68484abb2964ad319728083cc9' &&
              token.contentId === 'dns%3A0xtracker.com' &&
              token.slotEndTime >= Date.now(),
          ),
        );
        setLoading(false);
      })
      .catch(console.error);
  }, [ownerAddress, wallet.connected]);

  return [tokens, loading];
};

export default UseAdvertisingSlots;

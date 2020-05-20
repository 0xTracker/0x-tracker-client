import React from 'react';

import TopBannerView from './top-banner-view';
import useAdvertRandomizer from '../hooks/use-advert-randomizer';

const TopBanner = () => {
  const advert = useAdvertRandomizer();

  if (advert === undefined) {
    return null;
  }

  return <TopBannerView advert={advert} />;
};

export default TopBanner;

import React from 'react';

import SideBannerView from './side-banner-view';
import useAdvertRandomizer from '../hooks/use-advert-randomizer';

const SideBanner = (props) => {
  const advert = useAdvertRandomizer();

  if (advert === undefined) {
    return null;
  }

  return <SideBannerView advert={advert} {...props} />;
};

export default SideBanner;

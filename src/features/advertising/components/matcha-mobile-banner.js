import React from 'react';

import Link from '../../../components/link';

const MatchaMobileBanner = () => (
  <Link
    css="max-width: 100%; margin: 0 0 1.25rem 0;"
    href="https://matcha.xyz/?utm_source=0xtracker&utm_medium=banner&utm_campaign=allthetokens"
  >
    <img
      alt="1000+ tokens available on Matcha"
      css="max-width: 100%; border-radius: 0.25rem;"
      src="/assets/advertising/matcha-mobile-banner.png"
    />
  </Link>
);

export default MatchaMobileBanner;

import { useEffect, useState } from 'react';

import getRandomAdvert from '../util/get-random-advert';

const useAdvertRandomizer = () => {
  const [advert, setAdvert] = useState();

  useEffect(() => {
    // eslint-disable-next-line promise/catch-or-return
    getRandomAdvert().then((initialAdvert) => {
      setAdvert(initialAdvert);
    });
  }, []);

  return advert;
};

export default useAdvertRandomizer;

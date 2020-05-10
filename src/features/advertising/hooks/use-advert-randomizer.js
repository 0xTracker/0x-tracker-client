import { useInterval } from 'react-use';
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

  useInterval(() => {
    // eslint-disable-next-line promise/catch-or-return
    getRandomAdvert().then((nextAdvert) => {
      setAdvert(nextAdvert);
    });
  }, 30000);

  return advert;
};

export default useAdvertRandomizer;

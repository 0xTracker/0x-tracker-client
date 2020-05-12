import { useInterval } from 'react-use';
import { useState } from 'react';

import getRandomAdvert from '../util/get-random-advert';

const useAdvertRandomizer = () => {
  const [advert, setAdvert] = useState(getRandomAdvert());

  useInterval(() => {
    setAdvert(getRandomAdvert());
  }, 30000);

  return advert;
};

export default useAdvertRandomizer;

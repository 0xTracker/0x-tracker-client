import { BRAVE_ADVERT, FATHOM_ADVERT } from '../constants';

const getRandomAdvert = () => {
  const ads = [BRAVE_ADVERT, FATHOM_ADVERT];
  const int = Math.floor(Math.random() * (1 - 0 + 1) + 0);

  return ads[int];
};

export default getRandomAdvert;

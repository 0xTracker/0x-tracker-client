import callApi from '../../../util/call-api';

const getRandomAdvert = () =>
  callApi('ad-slots/current').catch((error) => {
    if (error.response && error.response.status === 204) {
      return undefined;
    }

    throw error;
  });

export default getRandomAdvert;

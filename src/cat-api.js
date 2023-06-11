const API_KEY =
  'live_XnTCpKy16l1JMklH7t2Asz3Xg6NZFYH8wZMgkfG5kcaUTpEuBYZq8Mgnl36OZrRU';

const BASE_URL = 'https://api.thecatapi.com/v1/';

const options = {
  headers: {
    'x-api-key': API_KEY,
  },
};

export const fetchBreeds = function () {
  return fetch(`${BASE_URL}breeds`, options).then(response => response.json());
};

export const fetchCatByBreed = function (breedId) {
  const url = `${BASE_URL}images/search?breed_ids=${breedId}`;

  return fetch(url, options).then(response => response.json());
};

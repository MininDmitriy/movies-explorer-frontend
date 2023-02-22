export const BASE_URL = 'https://api.nomoreparties.co/';

export const getMoviesFromBV = () => {
  return fetch(`${BASE_URL}/beatfilm-movies`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    }
  }).then((res) => {
    if (res.ok) {
      return res.json();
    }

    return Promise.reject(`Ошибка: ${res.status}`);
  });
}
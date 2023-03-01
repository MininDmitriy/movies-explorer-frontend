export const BASE_URL = 'https://api.dbminin.diplom.nomoredomains.rocks';

export const checkUserJWT = (JWT) => {
  return fetch(`${BASE_URL}/users/me`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${JWT}`,
    }
  }).then(checkResponse);
}

export const getInfoAboutProfile = () => {
  return fetch(`${BASE_URL}/users/me`, {
    method: 'GET',
    headers: {
      'authorization': `Bearer ${localStorage.getItem('jwt')}`,
      'content-type': 'application/json'
    }
  }).then(checkResponse);
}

export const handleRegistration = (userEmail, userPassword, userName) => {
  return fetch(`${BASE_URL}/signup`, {
    method: 'POST',
    headers: {
      'content-type': 'application/json'
    },
    body: JSON.stringify({
      'email': `${userEmail}`,
      'password': `${userPassword}`,
      'name': `${userName}`
    })
  }).then(checkResponse);
};

export const handleAuthenticate = (userEmail, userPassword) => {
  return fetch(`${BASE_URL}/signin`, {
    method: 'POST',
    headers: {
      'content-type': 'application/json'
    },
    body: JSON.stringify({
      'email': `${userEmail}`,
      'password': `${userPassword}`
    })
  }).then(checkResponse);
};

export const changeProfile = ({ newName, newEmail }) => {
  return fetch(`${BASE_URL}/users/me`, {
    method: 'PATCH',
    headers: {
      'authorization': `Bearer ${localStorage.getItem('jwt')}`,
      'content-type': 'application/json'
    },
    body: JSON.stringify({
      name: `${newName}`,
      email: `${newEmail}`
    })
  }).then(checkResponse);
}

export const getMovies = () => {
  return fetch(`${BASE_URL}/movies`, {
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${localStorage.getItem('jwt')}`,
      'Content-Type': 'application/json',
    }
  }).then(checkResponse);
}

export const addMovies = (movie) => {
  return fetch(`${BASE_URL}/movies`, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${localStorage.getItem('jwt')}`,
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      country: `${movie.country}`,
      director: `${movie.director}`,
      duration: `${movie.duration}`,
      year: `${movie.year}`,
      description: `${movie.description}`,
      image: `https://api.nomoreparties.co${movie.image.url}`,        
      trailerLink: `${movie.trailerLink}`,
      nameRU: `${movie.nameRU}`,
      nameEN: `${movie.nameEN}`,
      thumbnail: `https://api.nomoreparties.co${movie.image.formats.thumbnail.url}`,
      movieId: `${movie.id}`
    }),
  }).then(checkResponse);
}

export const deleteMovies = (id) => {
  return fetch(`${BASE_URL}/movies/${id}`, {
    method: 'DELETE',
    headers: {
      'Authorization': `Bearer ${localStorage.getItem('jwt')}`,
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    }
  }).then(checkResponse);
}

const checkResponse = (res) => {
  if (res.ok) {
    return res.json();
  }
    return Promise.reject(`Что-то пошло не так: ${res.status}`);
}
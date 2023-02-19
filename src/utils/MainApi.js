//Работа со своим API

export const baseUrl = 'https://api.dbminin.diplom.nomoredomains.rocks';

//Проверка валидности jwt-токена и получение данных пользователя

export const checkUserJWT = (JWT) => {
  return fetch(`${baseUrl}/users/me`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${JWT}`,
    }
  }).then(checkResponse);
}

//Получение данных о пользователе с последующим формированием контекста currentUser

export const getInfoAboutProfile = () => {
  return fetch(`${baseUrl}/users/me`, {
    method: 'GET',
    headers: {
      authorization: `Bearer ${localStorage.getItem('jwt')}`,
      'content-type': 'application/json'
    }
  }).then(checkResponse);
}

//Регистрация пользователя
  
export const handleRegistration = (userEmail, userPassword, userName) => {
  return fetch(`${baseUrl}/signup`, {
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

//Аутентификация пользователя

export const handleAuthenticate = (userEmail, userPassword) => {
  return fetch(`${baseUrl}/signin`, {
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

//Изменение данных пользователя

export const changeProfile = ({ newName, newEmail }) => {
  return fetch(`${baseUrl}/users/me`, {
    method: 'PATCH',
    headers: {
      authorization: `Bearer ${localStorage.getItem('jwt')}`,
      'content-type': 'application/json'
    },
    body: JSON.stringify({
      name: `${newName}`,
      email: `${newEmail}`
    })
  }).then(checkResponse);
}

export const getMovies = () => {
  return fetch(`${baseUrl}/movies`, {
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${localStorage.getItem('jwt')}`,
      'Content-Type': 'application/json',
    }
  }).then(checkResponse);
}

export const addMovies = (data) => {
  return fetch(`${baseUrl}/movies`, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${localStorage.getItem('jwt')}`,
      'Content-Type': 'application/json',
    }
  }).then(checkResponse);
}

export const deleteMovies = (movieId) => {
  return fetch(`${baseUrl}/movies/${movieId}`, {
    method: 'DELETE',
    headers: {
      'Authorization': `Bearer ${localStorage.getItem('jwt')}`,
      'Content-Type': 'application/json',
    }
  }).then(checkResponse);
}

const checkResponse = (res) => {
  if (res.ok) {
    return res.json();
  }
    return Promise.reject(`Что-то пошло не так: ${res.status}`);
}
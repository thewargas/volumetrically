export const BASE_URL = "https://api.thewargas.nomoredomains.monster";

function handleResponse(response) {
  if (response.ok) {
    return response.json();
  }

  return Promise.reject(`Ошибка: ${response.status}`);
}

export const register = ( email, login, password ) => {
  return fetch(`${BASE_URL}/signup`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, login, password }),
  }).then(handleResponse);
};

export const authorize = ( login, password) => {
  return fetch(`${BASE_URL}/signin`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ login, password }),
  }).then(handleResponse);
};

export const checkToken = (data) => {
  return fetch(`${BASE_URL}/users/me`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${data}`,
    },
  }).then(handleResponse);
};

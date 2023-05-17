import React from "react";

class MainApi extends React.Component {
  constructor(props) {
    super(props);
    
    this._baseUrl = props.baseUrl;
    this._headers = props.headers;
  }

  _getServerResponse() {
    return res => res.ok ? res.json() : Promise.reject(res.status);
  }

  register({ name, email, password }) {
    return fetch(`${this._baseUrl}/signup`, {
      method: 'POST',
      headers: this._headers,
      body: JSON.stringify({ name, email, password }),
    })
      .then(this._getServerResponse());
  }

  authorise({ email, password }) {
    return fetch(`${this._baseUrl}/signin`, {
      method: 'POST',
      headers: this._headers,
      body: JSON.stringify({ email, password }),
    })
      .then(this._getServerResponse());
  }

  checkToken(token) {
    return fetch(`${this._baseUrl}/users/me`, {
      method: 'GET',
      headers: {...this._headers,
        'Authorization': `Bearer ${token}`,
      }
    })
      .then(this._getServerResponse());
  }

  getMyInfo() {
    return fetch(`${this._baseUrl}/users/me`, {
      method: 'GET',
      headers: {...this._headers,
        'Authorization': `Bearer ${localStorage.getItem('token')}`,
      }
    })
      .then(this._getServerResponse());
  }

  updateMyInfo({ name, email }) {
    return fetch(`${this._baseUrl}/users/me`, {
      method: 'PATCH',
      headers: {...this._headers,
        'Authorization': `Bearer ${localStorage.getItem('token')}`,
      },
      body: JSON.stringify({ name, email })
    })
      .then(this._getServerResponse());
  }

  getSavedMovies() {
    return fetch(`${this._baseUrl}/movies`, {
      method: 'GET',
      headers: {...this._headers,
        'Authorization': `Bearer ${localStorage.getItem('token')}`,
      }
    })
      .then(this._getServerResponse());
  }

  addNewMovie(movie) {
    return fetch(`${this._baseUrl}/movies`, {
      method: 'POST',
      headers: {...this._headers,
        'Authorization': `Bearer ${localStorage.getItem('token')}`,
      },
      body: JSON.stringify({ ...movie })
    })
      .then(this._getServerResponse());
  }

  unsaveMovie(movieId) {
    return fetch(`${this._baseUrl}/movies/${movieId}`, {
      method: 'DELETE',
      headers: {...this._headers,
        'Authorization': `Bearer ${localStorage.getItem('token')}`,
      }
    })
      .then(this._getServerResponse());
  }
}

export const mainApi = new MainApi({
  baseUrl: 'https://api.whatsthatfilm.nomoredomainsclub.ru',
  headers: {
    'Content-Type': 'application/json',
    /*'Authorization': `Bearer ${localStorage.getItem('token')}`*/
  }
});
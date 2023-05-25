import React from "react";

class MoviesApi extends React.Component {
  constructor(props) {
    super(props);
    
    this._baseUrl = props.baseUrl;
    this._headers = props.headers;
  }

  _getServerResponse() {
    return res => res.ok ? res.json() : Promise.reject(res.status);
  }

  getAllBeatMovies() {
    return fetch(this._baseUrl, {
      method: 'GET',
      headers: this._headers,
    })
      .then(this._getServerResponse());
  }

}

export const moviesApi = new MoviesApi({
  baseUrl: 'https://api.nomoreparties.co/beatfilm-movies',
  headers: {
    'Content-Type': 'application/json',
  }
});
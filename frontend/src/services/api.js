// In frontend/src/services/api.js

import axios from 'axios';

// Create a new Axios instance
const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
});

// IMPORTANT: Intercept every request to attach the token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      // Configure the header to send the token
      config.headers['x-auth-token'] = token;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default api;
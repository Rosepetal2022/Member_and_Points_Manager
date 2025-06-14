// src/api.js
import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:8888/api';

const api = axios.create({
  baseURL: API_URL, 
});

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('id_token'); 
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export default api;

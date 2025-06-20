// src/api/api.js
import axios from 'axios';

const API = axios.create({
  baseURL: 'http://localhost:8181', // Change if deployed
});

// Automatically attach JWT token from localStorage to every request
API.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default API;

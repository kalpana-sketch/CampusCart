import axios from 'axios';

const api = axios.create({
  baseURL: 'https://campuscart-1-9djo.onrender.com/api',
});

// Add a request interceptor to add the JWT token to headers
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },

  (error) => {
    return Promise.reject(error);
  }
);

export default api;

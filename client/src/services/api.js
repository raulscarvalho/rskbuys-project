import axios from 'axios';

const urlBackEnd = import.meta.env.VITE_API_URL || 'http://localhost:3000/api';

const api = axios.create({
  baseURL: urlBackEnd,
});

export default api;
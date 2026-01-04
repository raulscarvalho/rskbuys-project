import axios from 'axios';

const urlBackEnd = 'https://rskbuys-project.onrender.com/api'; 

const api = axios.create({
  baseURL: urlBackEnd,
});

export default api;
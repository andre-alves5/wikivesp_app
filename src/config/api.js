import axios from 'axios';

const api = axios.create({
  baseURL: 'https://wikivesp-backend.herokuapp.com',
});

export default api;

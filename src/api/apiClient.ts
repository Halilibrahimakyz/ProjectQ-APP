import axios from 'axios';
import { setupInterceptorsTo } from './interceptors';

const api = axios.create({
  baseURL: 'http://192.168.1.100:3333/api',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,
});

setupInterceptorsTo(api);

export default api;

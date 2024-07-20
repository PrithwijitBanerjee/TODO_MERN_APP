import axios from 'axios';
import { setupInterceptors } from '../axios_interceptors/axiosIntercept';

export const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_REACT_APP_BASE_URL
});

// Apply interceptors to the custom axios instance
setupInterceptors(axiosInstance);
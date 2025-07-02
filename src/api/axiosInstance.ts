import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'http://localhost:4400',
  withCredentials: true,
});

export default axiosInstance;

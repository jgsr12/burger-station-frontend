import axios from 'axios';

const axiosInstance = axios.create({
  // baseURL: 'https://burger-station-backend.onrender.com',
  baseURL: 'http://localhost:4400',
  withCredentials: true,
});

export default axiosInstance;

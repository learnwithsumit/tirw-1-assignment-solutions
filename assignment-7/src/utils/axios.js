import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'http://localhost:9000/api',
});

export default axiosInstance;

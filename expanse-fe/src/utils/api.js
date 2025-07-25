import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'https://spendwise-rko5.onrender.com/api/v1', 
  withCredentials: true,
});

        
export default axiosInstance;
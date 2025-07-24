import axios from 'axios';
axios.defaults.baseURL = import.meta.env.BASE_URL; 

console.log("Axios baseURL:", axios.defaults.baseURL); 
axios.defaults.withCredentials = true;                
export default axios;
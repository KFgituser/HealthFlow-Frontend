import axios from 'axios';

const api = axios.create({
    baseURL: process.env.REACT_APP_BACKEND_URL, //Read from the .env file
    withCredentials: true, //"Used to enable cross-origin requests with cookies or session data.
});

export default api;


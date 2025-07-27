import axios from 'axios';

const api = axios.create({
    baseURL: process.env.REACT_APP_BACKEND_URL, //Spring Boot backend
    withCredentials: true,
});

export default api;


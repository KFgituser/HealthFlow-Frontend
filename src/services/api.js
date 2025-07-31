/*

The services/api.js file is typically used in a React or JavaScript project to centralize API calls.
services/: Holds service layer files.

api.js:
Base URL config
Common axios instance
Utility functions for making API requests (e.g., loginUser(), getDoctors())

*/


import axios from 'axios';

const api = axios.create({
    baseURL: process.env.REACT_APP_BACKEND_URL, //Read from the .env file
    withCredentials: true, //"Used to enable cross-origin requests with cookies or session data.
});

export default api;


import axios from 'axios';

// Create an axios instance with your backend URL
const API = axios.create({
    baseURL: 'http://localhost:5000/api/auth',
});

// Auth API calls
export const loginUser = (data) => API.post('/login', data);
export const registerUser = (data) => API.post('/register', data);
export const requestOTP = (email) => API.post('/request-otp', { email });
export const resetPassword = (data) => API.post('/reset-password', data);
export const verifyRegistration = (data) => API.post('/verify-registration', data);

export default API;
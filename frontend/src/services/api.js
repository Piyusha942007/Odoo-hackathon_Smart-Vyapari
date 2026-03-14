import axios from 'axios';

// Create an axios instance with your backend URL
const API = axios.create({
    baseURL: 'http://localhost:5001/api',
});

// Auth API calls
export const loginUser = (data) => API.post('/auth/login', data);
export const registerUser = (data) => API.post('/auth/register', data);
export const requestOTP = (email) => API.post('/auth/request-otp', { email });
export const resetPassword = (data) => API.post('/auth/reset-password', data);
export const verifyRegistration = (data) => API.post('/auth/verify-registration', data);

// Dashboard
export const getDashboardStats = () => API.get('/dashboard/stats');

// Products
export const getProducts = () => API.get('/products');
export const createProduct = (data) => API.post('/products', data);

// Operations
export const createReceipt = (data) => API.post('/operations/receipts', data);
export const getReceipts = () => API.get('/operations/receipts');
export const createDelivery = (data) => API.post('/operations/deliveries', data);
export const getDeliveries = () => API.get('/operations/deliveries');
export const createTransfer = (data) => API.post('/operations/transfers', data);
export const createAdjustment = (data) => API.post('/operations/adjustments', data);

// Ledger
export const getLedger = () => API.get('/ledger');

export default API;

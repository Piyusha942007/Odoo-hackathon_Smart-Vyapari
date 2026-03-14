import express from 'express';
import { register, login, requestOTP, resetPassword, verifyRegistrationOTP } from '../controllers/authController.js';

const router = express.Router();

router.post('/register', register);
router.post('/login', login);

router.post('/request-otp', requestOTP);
router.post('/reset-password', resetPassword);
router.post('/verify-registration', verifyRegistrationOTP);

export default router;
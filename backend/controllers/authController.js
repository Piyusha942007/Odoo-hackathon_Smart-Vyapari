import pool from '../config/db.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import nodemailer from 'nodemailer';

export const register = async (req, res) => {
    const { name, email, password, role } = req.body;
    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        
        const otpCode = Math.floor(100000 + Math.random() * 900000).toString();
        const otpExpiry = new Date(Date.now() + 15 * 60 * 1000); // 15 minutes

        const result = await pool.query(
            'INSERT INTO accounts (fullname, email, password, role, otp_code, otp_expiry) VALUES ($1, $2, $3, $4, $5, $6) RETURNING id, fullname, email, role',
            [name, email, hashedPassword, role || 'manager', otpCode, otpExpiry]
        );

        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS
            }
        });

        await transporter.sendMail({
            from: process.env.EMAIL_USER,
            to: email,
            subject: 'Smart Vyapari - Verify Your Email',
            text: `Welcome to Smart Vyapari! Your OTP for email verification is: ${otpCode}. It is valid for 15 minutes.`
        });

        res.status(201).json({ success: true, message: 'Account created. OTP sent to email.', user: result.rows[0] });
    } catch (error) {
        res.status(500).json({ success: false, message: "Email already exists or database error." });
    }
};

export const login = async (req, res) => {
    const { email, password } = req.body;
    try {
        const result = await pool.query('SELECT * FROM accounts WHERE email = $1', [email]);
        const user = result.rows[0];

        if (!user || !(await bcrypt.compare(password, user.password))) {
            return res.status(401).json({ success: false, message: "Invalid credentials" });
        }

        const token = jwt.sign({ id: user.id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '1d' });

        res.json({
            success: true,
            token,
            user: { id: user.id, name: user.fullname, role: user.role }
        });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

export const requestOTP = async (req, res) => {
    const { email } = req.body;
    try {
        const result = await pool.query('SELECT * FROM accounts WHERE email = $1', [email]);
        if (result.rows.length === 0) {
            return res.status(404).json({ success: false, message: "User not found" });
        }
        
        const otpCode = Math.floor(100000 + Math.random() * 900000).toString();
        const otpExpiry = new Date(Date.now() + 15 * 60 * 1000); // 15 minutes

        await pool.query('UPDATE accounts SET otp_code = $1, otp_expiry = $2 WHERE email = $3', [otpCode, otpExpiry, email]);

        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS
            }
        });

        await transporter.sendMail({
            from: process.env.EMAIL_USER,
            to: email,
            subject: 'Password Reset OTP',
            text: `Your OTP for password reset is: ${otpCode}. It is valid for 15 minutes.`
        });

        res.json({ success: true, message: "OTP sent to email" });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

export const resetPassword = async (req, res) => {
    const { email, otp, newPassword } = req.body;
    try {
        const result = await pool.query('SELECT * FROM accounts WHERE email = $1', [email]);
        const user = result.rows[0];

        if (!user || user.otp_code !== otp || new Date() > new Date(user.otp_expiry)) {
            return res.status(400).json({ success: false, message: "Invalid or expired OTP" });
        }

        const hashedPassword = await bcrypt.hash(newPassword, 10);
        await pool.query('UPDATE accounts SET password = $1, otp_code = NULL, otp_expiry = NULL WHERE email = $2', [hashedPassword, email]);

        res.json({ success: true, message: "Password reset successful" });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

export const verifyRegistrationOTP = async (req, res) => {
    const { email, otp } = req.body;
    try {
        const result = await pool.query('SELECT * FROM accounts WHERE email = $1', [email]);
        const user = result.rows[0];

        if (!user || user.otp_code !== otp || new Date() > new Date(user.otp_expiry)) {
            return res.status(400).json({ success: false, message: "Invalid or expired OTP" });
        }

        await pool.query('UPDATE accounts SET otp_code = NULL, otp_expiry = NULL WHERE email = $1', [email]);

        const token = jwt.sign({ id: user.id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '1d' });

        res.json({
            success: true,
            message: "Email verified successfully",
            token,
            user: { id: user.id, name: user.fullname, role: user.role }
        });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};
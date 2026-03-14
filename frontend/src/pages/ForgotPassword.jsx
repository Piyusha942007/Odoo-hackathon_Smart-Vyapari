import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Package } from 'lucide-react';
import { requestOTP, resetPassword } from '../services/api';

export default function ForgotPassword() {
    const navigate = useNavigate();
    const [step, setStep] = useState('request'); // 'request' or 'reset'
    const [email, setEmail] = useState('');
    const [otp, setOtp] = useState('');
    const [newPassword, setNewPassword] = useState('');

    const handleRequestOTP = async (e) => {
        e.preventDefault();
        try {
            await requestOTP(email);
            setStep('reset');
        } catch (err) {
            alert("Failed to send OTP. " + (err.response?.data?.message || ""));
        }
    };

    const handleResetPassword = async (e) => {
        e.preventDefault();
        try {
            await resetPassword({ email, otp, newPassword });
            alert("Password reset successful! Please log in.");
            navigate('/login');
        } catch (err) {
            alert("Password reset failed. " + (err.response?.data?.message || ""));
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-[#4073bd] p-4 font-sans">
            <div className="w-full max-w-md bg-white rounded-xl shadow-lg p-10">
                <div className="text-center mb-6">
                    <div className="inline-flex justify-center items-center bg-[#1F3A93] h-20 w-20 rounded-full mb-6 relative">
                        <Package className="h-10 w-10 text-white" />
                    </div>
                    <h1 className="text-[26px] font-semibold text-[#1F3A93] tracking-tight">Smart Vyapari</h1>
                    <p className="text-[17px] text-[#7f8c8d]">CodeInventory</p>
                    <p className="text-[15px] text-[#95a5a6] mt-4 mb-2">Reset your password</p>
                </div>

                {step === 'request' ? (
                    <form onSubmit={handleRequestOTP} className="space-y-5">
                        <p className="text-sm text-gray-500 text-center mb-4">
                            Enter the email address associated with your account, and we'll send you a 6-digit OTP to reset your password.
                        </p>
                        <div>
                            <label className="block text-[15px] font-semibold text-[#1F3A93] mb-1.5 text-left">Email</label>
                            <input
                                type="email"
                                className="w-full border border-gray-200 rounded-lg p-2.5 text-[15px] outline-none focus:border-[#1F3A93] placeholder-gray-400"
                                placeholder="manager@smartvyapari.com"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                        </div>
                        <div className="pt-2">
                            <button type="submit" className="w-full bg-[#1F3A93] text-white py-3 rounded-lg hover:bg-[#152866] font-medium transition-colors text-[16px]">
                                Send OTP
                            </button>
                        </div>
                    </form>
                ) : (
                    <form onSubmit={handleResetPassword} className="space-y-5">
                        <div className="bg-sky-50 border border-sky-200 p-4 rounded-lg mb-4">
                            <p className="text-sm text-[#1F3A93] text-center font-medium">
                                An OTP has been sent to <strong>{email}</strong>
                            </p>
                        </div>
                        <div>
                            <label className="block text-[15px] font-semibold text-[#1F3A93] mb-1.5 text-left">Enter 6-digit OTP</label>
                            <input
                                type="text"
                                className="w-full border border-gray-200 rounded-lg p-2.5 text-[15px] outline-none focus:border-[#1F3A93] placeholder-gray-400 text-center tracking-widest text-lg font-bold"
                                placeholder="123456"
                                value={otp}
                                onChange={(e) => setOtp(e.target.value)}
                                required
                            />
                        </div>
                        <div>
                            <label className="block text-[15px] font-semibold text-[#1F3A93] mb-1.5 text-left">New Password</label>
                            <input
                                type="password"
                                className="w-full border border-gray-200 rounded-lg p-2.5 text-[15px] outline-none focus:border-[#1F3A93] placeholder-gray-400"
                                placeholder="Enter new password"
                                value={newPassword}
                                onChange={(e) => setNewPassword(e.target.value)}
                                required
                            />
                        </div>
                        <div className="pt-2">
                            <button type="submit" className="w-full bg-[#5DADE2] text-white py-3 rounded-lg hover:bg-[#4A9CD0] font-bold transition-colors text-[16px]">
                                Reset Password
                            </button>
                        </div>
                    </form>
                )}

                <div className="mt-8 text-center text-[15px] text-gray-500">
                    Remember your password? <Link to="/login" className="text-[#5DADE2] hover:underline">Back to Login</Link>
                </div>
            </div>
        </div>
    );
}

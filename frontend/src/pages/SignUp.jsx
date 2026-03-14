import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Package } from 'lucide-react';
import { registerUser, verifyRegistration } from '../services/api';
import { useApp } from '../context/store';

export default function SignUp() {
    const navigate = useNavigate();
    const { setUser } = useApp();
    const [formData, setFormData] = useState({ name: '', email: '', password: '', role: 'manager' });
    const [showOTP, setShowOTP] = useState(false);
    const [otp, setOtp] = useState('');

    const handleSignUp = async (e) => {
        e.preventDefault();
        try {
            await registerUser(formData);
            setShowOTP(true);
        } catch (err) {
            alert("Signup failed.");
        }
    };

    const handleVerifyOTP = async (e) => {
        e.preventDefault();
        try {
            const res = await verifyRegistration({ email: formData.email, otp });
            if (res.data.success) {
                localStorage.setItem('token', res.data.token);
                setUser(res.data.user);
                navigate('/dashboard');
            }
        } catch (error) {
            alert("Verification failed: " + (error.response?.data?.message || "Invalid OTP"));
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-[#4073bd] p-4 font-sans">
            <div className="w-full max-w-md bg-white rounded-xl shadow-lg p-10 mt-8 mb-8">
                <div className="text-center mb-6">
                    <div className="inline-flex justify-center items-center bg-[#1F3A93] h-20 w-20 rounded-full mb-6 relative">
                        <Package className="h-10 w-10 text-white" />
                    </div>
                    <h1 className="text-[26px] font-semibold text-[#1F3A93] tracking-tight">Smart Vyapari</h1>
                    <p className="text-[17px] text-[#7f8c8d]">CodeInventory</p>
                    <p className="text-[15px] text-[#95a5a6] mt-4 mb-2">Create your account</p>
                </div>
                
                {!showOTP ? (
                    <form onSubmit={handleSignUp} className="space-y-5">
                        <div>
                            <label className="block text-[15px] font-semibold text-[#1F3A93] mb-1.5 text-left">Full Name</label>
                            <input
                                type="text"
                                className="w-full border border-gray-200 rounded-lg p-2.5 text-[15px] outline-none focus:border-[#1F3A93] placeholder-gray-400"
                                placeholder="John Doe"
                                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                required
                            />
                        </div>
                        <div>
                            <label className="block text-[15px] font-semibold text-[#1F3A93] mb-1.5 text-left">Email</label>
                            <input
                                type="email"
                                className="w-full border border-gray-200 rounded-lg p-2.5 text-[15px] outline-none focus:border-[#1F3A93] placeholder-gray-400"
                                placeholder="manager@smartvyapari.com"
                                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                required
                            />
                        </div>
                        <div>
                            <label className="block text-[15px] font-semibold text-[#1F3A93] mb-1.5 text-left">Role</label>
                            <select
                                className="w-full border border-gray-200 rounded-lg p-2.5 text-[15px] outline-none focus:border-[#1F3A93] text-gray-700 bg-white"
                                onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                            >
                                <option value="manager">Inventory Manager</option>
                                <option value="staff">Warehouse Staff</option>
                            </select>
                        </div>
                        <div>
                            <label className="block text-[15px] font-semibold text-[#1F3A93] mb-1.5 text-left">Password</label>
                            <input
                                type="password"
                                className="w-full border border-gray-200 rounded-lg p-2.5 text-[15px] outline-none focus:border-[#1F3A93] placeholder-gray-400"
                                placeholder="Enter your password"
                                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                                required
                            />
                        </div>
                        <div className="pt-2">
                            <button type="submit" className="w-full bg-[#1F3A93] text-white py-3 rounded-lg hover:bg-[#152866] font-medium transition-colors text-[16px]">
                                Sign Up & Get OTP
                            </button>
                        </div>
                    </form>
                ) : (
                    <form onSubmit={handleVerifyOTP} className="space-y-5">
                        <div className="bg-sky/10 border border-sky/30 p-4 rounded-lg mb-6">
                            <p className="text-sm text-navy text-center font-medium">
                                An OTP has been sent to your email address: <strong>{formData.email}</strong>. It may take a minute to arrive.
                            </p>
                        </div>
                        <div>
                            <label className="block text-[15px] font-semibold text-[#1F3A93] mb-1.5 text-left">Enter OTP</label>
                            <input
                                type="text"
                                className="w-full border border-gray-200 rounded-lg p-2.5 text-[15px] outline-none focus:border-[#1F3A93] placeholder-gray-400 text-center tracking-widest text-lg font-bold"
                                placeholder="123456"
                                value={otp}
                                onChange={(e) => setOtp(e.target.value)}
                                required
                            />
                        </div>
                        <div className="pt-2">
                            <button type="submit" className="w-full bg-[#5DADE2] text-white py-3 rounded-lg hover:bg-[#4A9CD0] font-bold transition-colors text-[16px]">
                                Verify Email
                            </button>
                        </div>
                    </form>
                )}
                
                <div className="mt-8 text-center text-[15px] text-gray-500">
                    Already have an account? <Link to="/login" className="text-[#5DADE2] hover:underline">Sign in</Link>
                </div>
            </div>
        </div>
    );
}
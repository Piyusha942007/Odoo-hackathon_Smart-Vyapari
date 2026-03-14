import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useApp } from '../context/store';
import { Package } from 'lucide-react';
import { loginUser } from '../services/api';

export default function Login() {
    const navigate = useNavigate();
    const { setUser } = useApp();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    // Inside handleLogin function:
    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const res = await loginUser({ email, password });
            if (res.data.success) {
                localStorage.setItem('token', res.data.token); // Save session
                setUser(res.data.user);
                navigate('/dashboard');
            }
        } catch (err) {
            alert("Login failed: " + err.response?.data?.message);
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
                    <p className="text-[15px] text-[#95a5a6] mt-4 mb-2">Sign in to your account</p>
                </div>
                <form onSubmit={handleLogin} className="space-y-5">
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
                    <div>
                        <label className="block text-[15px] font-semibold text-[#1F3A93] mb-1.5 text-left">Password</label>
                        <input
                            type="password"
                            className="w-full border border-gray-200 rounded-lg p-2.5 text-[15px] outline-none focus:border-[#1F3A93] placeholder-gray-400"
                            placeholder="Enter your password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                        <div className="flex justify-end mt-2">
                            <Link to="/forgot-password" className="text-sm text-[#5DADE2] hover:underline">Forgot password?</Link>
                        </div>
                    </div>
                    <div className="pt-2">
                        <button type="submit" className="w-full bg-[#1F3A93] text-white py-3 rounded-lg hover:bg-[#152866] font-medium transition-colors text-[16px]">
                            Sign In
                        </button>
                    </div>
                </form>
                <div className="mt-8 text-center text-[15px] text-gray-500">
                    Don't have an account? <Link to="/signup" className="text-[#5DADE2] hover:underline">Sign up</Link>
                </div>
            </div>
        </div>
    );
}
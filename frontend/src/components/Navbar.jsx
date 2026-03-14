import { useNavigate } from 'react-router-dom';
import { useApp } from '../context/store';
import { Bell, User, LogOut } from 'lucide-react';

export default function Navbar() {
    const { user, setUser } = useApp();
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem('token');
        setUser(null);
        navigate('/login');
    };

    return (
        <header className="bg-purewhite shadow-sm h-16 flex items-center justify-between px-6 z-10 border-b border-gray-100">
            <h2 className="text-xl font-bold text-navy">Inventory Dashboard</h2>
            <div className="flex items-center space-x-4">
                <button className="text-coolgrey hover:text-navy transition-colors">
                    <Bell size={20} />
                </button>
                <div className="flex items-center space-x-2 border-l border-gray-200 pl-4">
                    <span className="text-sm font-semibold text-navy">{user?.name || 'Manager'}</span>
                    <button className="text-navy bg-sky/10 hover:bg-sky/20 transition-colors p-2 rounded-full">
                        <User size={20} />
                    </button>
                    <button onClick={handleLogout} className="text-red-500 hover:text-red-700 bg-red-50 hover:bg-red-100 transition-colors p-2 ml-2 rounded-full" title="Logout">
                        <LogOut size={20} />
                    </button>
                </div>
            </div>
        </header>
    );
}

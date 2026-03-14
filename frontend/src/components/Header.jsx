import React from 'react';
import { Bell, User, X } from 'lucide-react';
import { useLocation } from 'react-router-dom';

const Header = ({ title }) => {
    return (
        <div className="bg-[#2748B3] text-white flex items-center justify-between px-6 py-4 shadow-sm">
            {/* Left side */}
            <div className="flex items-center gap-4">
                <button className="text-blue-200 hover:text-white transition-colors">
                    <X size={20} />
                </button>
                <h2 className="text-lg font-bold tracking-wide">{title}</h2>
            </div>

            {/* Right side */}
            <div className="flex items-center gap-6">
                <button className="relative text-blue-200 hover:text-white transition-colors">
                    <Bell size={20} />
                    <span className="absolute -top-1 -right-1 bg-[#409BFF] text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full border-2 border-[#2748B3]">
                        6
                    </span>
                </button>
                
                <div className="flex items-center gap-3">
                    <div className="bg-white/20 p-2 rounded-full">
                        <User size={18} className="text-white" />
                    </div>
                    <div className="hidden md:block">
                        <p className="text-sm font-bold leading-tight">Inventory Manager</p>
                        <p className="text-[10px] text-blue-200 uppercase tracking-wider font-semibold">Manager</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Header;

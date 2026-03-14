import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
    LayoutDashboard, Package, Receipt, Truck,
    Settings2, ClipboardList, ArrowLeftRight,
    UserCircle, LogOut
} from 'lucide-react';

const SidebarLink = ({ to, icon: Icon, label }) => {
    const location = useLocation();
    const isActive = location.pathname === to;

    return (
        <Link
            to={to}
            className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${isActive
                ? 'bg-[#5DADE2] text-white'
                : 'text-gray-300 hover:bg-[#2c4fa8] hover:text-white'
                }`}
        >
            <Icon size={20} />
            <span className="font-medium text-sm">{label}</span>
        </Link>
    );
};

export default function Sidebar() {
    return (
        <aside className="w-64 bg-[#1F3A93] min-h-screen flex flex-col text-white sticky top-0">
            <div className="p-6">
                {/* Brand Header */}
                <div className="flex items-center gap-3 mb-10">
                    <div className="bg-white/20 p-2 rounded-lg">
                        <Package className="text-white" size={24} />
                    </div>
                    <div>
                        <h1 className="font-bold text-lg leading-tight">Smart Vyapari</h1>
                        <p className="text-[10px] text-blue-200 uppercase tracking-widest font-bold">CodeInventory</p>
                    </div>
                </div>

                {/* Navigation Links */}
                <nav className="space-y-1">
                    <SidebarLink to="/dashboard" icon={LayoutDashboard} label="Dashboard" />
                    <SidebarLink to="/products" icon={Package} label="Products" />
                    <SidebarLink to="/receipts" icon={Receipt} label="Receipts" />
                    <SidebarLink to="/delivery-orders" icon={Truck} label="Delivery Orders" />
                    <SidebarLink to="/settings" icon={Settings2} label="Inventory Adjustments" />
                    <SidebarLink to="/internal-transfers" icon={ArrowLeftRight} label="Internal Transfers" />
                    <SidebarLink to="/stock-ledger" icon={ClipboardList} label="Stock Ledger" />
                    <SidebarLink to="/warehouse-settings" icon={Settings2} label="Warehouse Settings" />
                    <SidebarLink to="/profile" icon={UserCircle} label="Profile" />
                </nav>
            </div>

            {/* Logout at bottom */}
            <div className="mt-auto p-6 border-t border-blue-800">
                <button className="flex items-center gap-3 text-gray-300 hover:text-white w-full transition-colors">
                    <LogOut size={20} />
                    <span className="font-medium text-sm">Logout</span>
                </button>
            </div>
        </aside>
    );
}
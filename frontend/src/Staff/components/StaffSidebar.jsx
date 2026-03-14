import React from 'react';
import { NavLink } from 'react-router-dom';
import { 
  LayoutDashboard, Box, Truck, 
  ArrowLeftRight, FileEdit, History, Database, Settings, Download
} from 'lucide-react';

const StaffSidebar = () => {
  const menuItems = [
    { name: 'Dashboard', path: '/dashboard', icon: <LayoutDashboard size={18} /> },
    { name: 'Products', path: '/products', icon: <Box size={18} /> },
    { name: 'Receipts', path: '/receipts', icon: <Download size={18} /> },
    { name: 'Delivery Orders', path: '/delivery-orders', icon: <Truck size={18} /> },
    { name: 'Internal Transfers', path: '/internal-transfers', icon: <ArrowLeftRight size={18} /> },
    { name: 'Inventory Adjustments', path: '/inventory-adjustments', icon: <FileEdit size={18} /> },
    { name: 'Move History', path: '/move-history', icon: <History size={18} /> },
    { name: 'Stock Ledger', path: '/stock-ledger', icon: <Database size={18} /> },
    { name: 'Warehouse Settings', path: '/settings', icon: <Settings size={18} /> },
  ];

  return (
    <div className="w-[240px] bg-[#1a2f6c] text-white flex flex-col h-screen shrink-0 shadow-xl overflow-hidden z-50">
      <div className="h-[80px] flex items-center px-6 shrink-0 pt-4">
        <div className="flex items-center gap-2">
          <div className="w-10 h-10 rounded-xl bg-white flex items-center justify-center shadow-sm shrink-0">
             {/* Note: In absolute precision this is the logo image area. Placeholder icon below: */}
            <div className="w-6 h-6 rounded-md bg-gradient-to-br from-blue-100 to-white" />
          </div>
          <div className="flex flex-col">
            <span className="font-bold text-[16px] leading-[1.1] text-white tracking-wide">Smart Vyapari</span>
            <span className="text-[10px] text-blue-200/80 leading-tight">CodeInventory</span>
          </div>
        </div>
      </div>
      <nav className="flex-1 overflow-y-auto py-6">
        <ul className="space-y-1 px-3">
          {menuItems.map((item) => (
            <li key={item.name}>
              <NavLink
                to={item.path}
                className={({ isActive }) =>
                  `flex items-center gap-3 px-3 py-2.5 text-[14px] font-medium transition-all duration-200 rounded-[10px] ${
                    isActive
                      ? 'bg-[#43a1e1] text-white shadow-sm'
                      : 'text-blue-100/70 hover:bg-white/10 hover:text-white'
                  }`
                }
              >
                {item.icon}
                <span>{item.name}</span>
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
};

export default StaffSidebar;
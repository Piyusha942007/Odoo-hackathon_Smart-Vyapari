import React from 'react';
import { NavLink } from 'react-router-dom';

const StaffSidebar = () => {
  const menuItems = [
    { name: 'Dashboard', path: '/dashboard', icon: '📊' },
    { name: 'Products', path: '/products', icon: '📦' },
    { name: 'Receipts', path: '/receipts', icon: '📥' },
    { name: 'Internal Transfers', path: '/internal-transfers', icon: '⇄' },
  ];

  return (
    <div className="h-full bg-[#1e293b] text-white p-4">
      <div className="mb-8 px-2 font-bold text-xl">Smart Vyapari</div>
      <nav className="space-y-1">
        {menuItems.map((item) => (
          <NavLink
            key={item.name}
            to={item.path}
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                isActive ? 'bg-blue-600 text-white' : 'text-slate-400 hover:bg-slate-800'
              }`
            }
          >
            <span>{item.icon}</span>
            {item.name}
          </NavLink>
        ))}
      </nav>
    </div>
  );
};

export default StaffSidebar;
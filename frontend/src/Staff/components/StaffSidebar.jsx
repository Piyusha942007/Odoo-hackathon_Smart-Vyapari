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
    <div className="w-[260px] bg-[#223985] text-white flex flex-col h-screen shrink-0 border-r border-[#1a2b66]">
      <div className="h-16 flex items-center px-6 shrink-0 bg-[#223985]">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded bg-white bg-opacity-10 flex items-center justify-center">
            <Box size={20} className="text-white" />
          </div>
          <div className="flex flex-col">
            <span className="font-bold text-[15px] leading-tight text-white tracking-wide">Smart Vyapari</span>
            <span className="text-[10px] text-blue-200 leading-tight">CodeInventory</span>
          </div>
        </div>
      </div>
      <nav className="flex-1 overflow-y-auto py-4">
        <ul className="space-y-1">
          {menuItems.map((item) => (
            <li key={item.name}>
              <NavLink
                to={item.path}
                className={({ isActive }) =>
                  `flex items-center gap-3 px-6 py-2.5 text-[14px] font-medium transition-colors ${
                    isActive
                      ? 'bg-[#53a7f2] text-white'
                      : 'text-blue-100 hover:bg-[#324ba6] hover:text-white'
                  }`
                }
                style={({ isActive }) => isActive ? { 
                  borderTopRightRadius: '24px', 
                  borderBottomRightRadius: '24px', 
                  marginRight: '16px' 
                } : { marginRight: '16px', borderTopRightRadius: '24px', borderBottomRightRadius: '24px' } }
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
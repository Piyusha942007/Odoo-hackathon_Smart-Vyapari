import React from 'react';
import { 
  LayoutDashboard, Box, Receipt, Truck, 
  ArrowLeftRight, FileEdit, History, Database, Settings 
} from 'lucide-react';

const StaffSidebar = () => {
  const menuItems = [
    { name: 'Dashboard', icon: <LayoutDashboard size={20} />, active: true },
    { name: 'Products', icon: <Box size={20} /> },
    { name: 'Receipts', icon: <Receipt size={20} /> },
    { name: 'Delivery Orders', icon: <Truck size={20} /> },
    { name: 'Internal Transfers', icon: <ArrowLeftRight size={20} /> },
    { name: 'Inventory Adjustments', icon: <FileEdit size={20} /> },
    { name: 'Move History', icon: <History size={20} /> },
    { name: 'Stock Ledger', icon: <Database size={20} /> },
    { name: 'Warehouse Settings', icon: <Settings size={20} /> },
  ];

  return (
    <div className="sidebar">
      <div className="logo">
        <div className="logo-icon">V</div>
        <span>Smart Vyapari</span>
      </div>
      <nav>
        {menuItems.map((item) => (
          <div key={item.name} className={`nav-item ${item.active ? 'active' : ''}`}>
            {item.icon}
            <span>{item.name}</span>
          </div>
        ))}
      </nav>
    </div>
  );
};

export default StaffSidebar;
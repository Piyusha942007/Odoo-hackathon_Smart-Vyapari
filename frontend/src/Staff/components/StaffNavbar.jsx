import React from 'react';

const StaffNavbar = () => {
  return (
    <header className="h-16 bg-[#2b4291] flex items-center justify-between px-8 text-white sticky top-0 z-40">
      <div className="flex items-center gap-2">
        <span className="font-bold text-lg">Smart Vyapari</span>
        <span className="text-[10px] text-slate-300 self-end mb-1">CodeInventory</span>
      </div>
      
      <div className="relative w-96">
        <span className="absolute left-3 top-2 text-slate-400">🔍</span>
        <input 
          type="text" 
          placeholder="Search SKU, product, or category..." 
          className="w-full bg-white text-slate-800 text-sm py-2 pl-10 pr-4 rounded-md focus:outline-none"
        />
      </div>
    </header>
  );
};

export default StaffNavbar; // Make sure this line exists!
import React from 'react';
import { Search } from 'lucide-react';

const StaffNavbar = () => {
  return (
    <header className="h-[60px] bg-white border-b border-slate-200 flex items-center justify-end px-6 sticky top-0 z-40">
      <div className="relative w-[380px]">
        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">
          <Search size={16} />
        </span>
        <input 
          type="text" 
          placeholder="Search SKU, product, or category..." 
          className="w-full bg-[#f8fafc] border border-slate-200 text-slate-800 text-sm py-2 pl-9 pr-4 rounded-[6px] focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
      </div>
    </header>
  );
};

export default StaffNavbar; // Make sure this line exists!
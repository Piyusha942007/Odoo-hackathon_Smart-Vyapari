import React from 'react';
import { Outlet } from 'react-router-dom';
import StaffSidebar from './components/StaffSidebar';
import StaffNavbar from './components/StaffNavbar';

const StaffLayout = () => {
  return (
    // Screen-height wrapper, hidden overflow on X to prevent shifting
    <div className="flex h-screen bg-[#f8fafc] overflow-hidden">
      
      {/* 1. Fixed Sidebar - Exact width from image */}
      <aside className="w-[240px] flex-shrink-0 bg-[#2b4291] shadow-xl z-50">
        <StaffSidebar />
      </aside>

      {/* 2. Main Scrollable Area */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Navbar sits at the top of the content area */}
        <StaffNavbar />
        
        {/* The Page Content scrollable area */}
        <main className="flex-1 overflow-y-auto p-8 custom-scrollbar">
          <div className="max-w-[1400px] mx-auto">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
};

export default StaffLayout;
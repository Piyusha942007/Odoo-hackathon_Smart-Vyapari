import React from 'react';
import { Outlet } from 'react-router-dom';
import StaffSidebar from './components/StaffSidebar';
import StaffNavbar from './components/StaffNavbar';

const StaffLayout = () => {
  return (
    <div className="flex h-screen bg-[#f1f5f9] font-sans antialiased text-slate-800">
      <StaffSidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <StaffNavbar />
        <main className="flex-1 overflow-x-hidden overflow-y-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default StaffLayout;
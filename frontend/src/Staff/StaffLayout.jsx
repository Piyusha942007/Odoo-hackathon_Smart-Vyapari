import React from 'react';
import { Outlet } from 'react-router-dom';
import StaffSidebar from './components/StaffSidebar';
import StaffNavbar from './components/StaffNavbar';
import { WarehouseProvider } from './context/WarehouseContext';

const StaffLayout = () => {
  return (
    <WarehouseProvider>
      <div className="flex bg-[#f8fbff] min-h-screen">
        <StaffSidebar />
        <div className="flex-1 flex flex-col min-w-0">
          <StaffNavbar />
          <main className="flex-1 overflow-x-hidden p-8">
            <Outlet />
          </main>
        </div>
      </div>
    </WarehouseProvider>
  );
};

export default StaffLayout;
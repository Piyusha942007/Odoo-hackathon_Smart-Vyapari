import React from 'react';
import StaffSidebar from './components/StaffSidebar';
import StaffNavbar from './components/StaffNavbar'; // You can create a simple top bar

const StaffLayout = ({ children }) => {
  return (
    <div className="layout-wrapper">
      <StaffSidebar />
      <div className="main-content" style={{ flex: 1 }}>
        <StaffNavbar /> 
        <main style={{ padding: '30px' }}>
          {children}
        </main>
      </div>
    </div>
  );
};

export default StaffLayout;
import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import StaffLayout from './StaffLayout';
import StaffDashboard from './pages/StaffDashboard';
import Receipts from './pages/Receipts';
// Import other pages as you create them
// import Products from './pages/Products'; 

const StaffRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<StaffLayout />}>
        {/* Redirect base path to dashboard */}
        <Route index element={<Navigate to="/dashboard" replace />} />
        
        <Route path="dashboard" element={<StaffDashboard />} />
        <Route path="receipts" element={<Receipts />} />
        
        {/* Placeholder for other routes */}
        <Route path="products" element={<div className="p-6">Products Page Coming Soon</div>} />
        <Route path="internal-transfers" element={<div className="p-6">Transfers Page</div>} />
      </Route>
    </Routes>
  );
};

export default StaffRoutes;
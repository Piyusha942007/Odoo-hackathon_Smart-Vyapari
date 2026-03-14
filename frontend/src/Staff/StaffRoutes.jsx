import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import StaffLayout from './StaffLayout';
import StaffDashboard from './pages/StaffDashboard';
import StaffProducts from './pages/StaffProducts';
import StaffReceipts from './pages/StaffReceipts';
import StaffMoveHistory from './pages/StaffMoveHistory';
import StaffStockLedger from './pages/StaffStockLedger';
import StaffDeliveryOrders from './pages/StaffDeliveryOrders';
import StaffInternalTransfers from './pages/StaffInternalTransfers';
import StaffInventoryAdjustments from './pages/StaffInventoryAdjustments';
import StaffWarehouseSettings from './pages/StaffWarehouseSettings';

// Placeholder Pages
const PlaceholderPage = ({ title }) => (
  <div className="p-6">
    <h1 className="text-2xl font-bold mb-4">{title}</h1>
    <p>This page is under construction.</p>
  </div>
);

const StaffRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<StaffLayout />}>
        {/* Redirect base path to dashboard */}
        <Route index element={<Navigate to="/dashboard" replace />} />
        
        <Route path="dashboard" element={<StaffDashboard />} />
        <Route path="products" element={<StaffProducts />} />
        <Route path="receipts" element={<StaffReceipts />} />
        <Route path="delivery-orders" element={<StaffDeliveryOrders />} />
        <Route path="internal-transfers" element={<StaffInternalTransfers />} />
        <Route path="inventory-adjustments" element={<StaffInventoryAdjustments />} />
        <Route path="move-history" element={<StaffMoveHistory />} />
        <Route path="stock-ledger" element={<StaffStockLedger />} />
        <Route path="settings" element={<StaffWarehouseSettings />} />
        
      </Route>
    </Routes>
  );
};

export default StaffRoutes;
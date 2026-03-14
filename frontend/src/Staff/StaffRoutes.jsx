import { Routes, Route } from "react-router-dom";
import { StaffDashboard } from "./pages/StaffDashboard";
import { InternalTransfers } from "./pages/InternalTransfers";
import { StockCounting } from "./pages/StockCounting";
import StaffLayout from "./StaffLayout";

export default function StaffRoutes() {
  return (
    <Routes>
      <Route element={<StaffLayout />}>
        {/* All routes inside here will share the Staff Sidebar/Navbar */}
        <Route path="dashboard" element={<StaffDashboard />} />
        <Route path="transfers" element={<InternalTransfers />} />
        <Route path="counting" element={<StockCounting />} />
      </Route>
    </Routes>
  );
}
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import StaffLayout from "./Staff/StaffLayout";
import { StaffDashboard } from "./Staff/pages/StaffDashboard";
import { InternalTransfers } from "./Staff/pages/InternalTransfers";
import { StockCounting } from "./Staff/pages/StockCounting";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* The Staff Layout wraps all your pages */}
        <Route path="/staff" element={<StaffLayout />}>
          <Route path="dashboard" element={<StaffDashboard />} />
          <Route path="transfers" element={<InternalTransfers />} />
          <Route path="counting" element={<StockCounting />} />
        </Route>

        {/* Redirect any basic access to your dashboard */}
        <Route path="*" element={<Navigate to="/staff/dashboard" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
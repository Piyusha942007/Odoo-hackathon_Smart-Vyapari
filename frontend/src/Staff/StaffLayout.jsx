import { StaffSidebar } from "./components/StaffSidebar";
import { StaffNavbar } from "./components/StaffNavbar";
import { Outlet } from "react-router-dom";

export default function StaffLayout() {
  return (
    <div className="flex min-h-screen bg-gray-50">
      <StaffSidebar />
      <div className="flex-1 flex flex-col">
        <StaffNavbar />
        <main className="p-8">
          {/* This renders the child components (Dashboard, Transfers, etc.) */}
          <Outlet /> 
        </main>
      </div>
    </div>
  );
}
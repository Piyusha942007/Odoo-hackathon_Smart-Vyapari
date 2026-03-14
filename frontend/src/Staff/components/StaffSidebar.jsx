import { Link, useLocation } from "react-router-dom";
import { 
  LayoutDashboard, 
  Package, 
  ArrowDownToLine, 
  Truck, 
  ArrowLeftRight, 
  ClipboardCheck, 
  History, 
  BookOpen, 
  LogOut 
} from "lucide-react";

export function StaffSidebar() {
  const location = useLocation();

  const menuItems = [
    { icon: LayoutDashboard, label: "Dashboard", path: "/staff/dashboard" },
    { icon: Package, label: "Products", path: "/staff/products" },
    { icon: ArrowDownToLine, label: "Receipts", path: "/staff/receipts" },
    { icon: Truck, label: "Delivery Orders", path: "/staff/deliveries" },
    { icon: ArrowLeftRight, label: "Internal Transfers", path: "/staff/transfers" },
    { icon: ClipboardCheck, label: "Inventory Adjustments", path: "/staff/counting" },
    { icon: History, label: "Move History", path: "/staff/history" },
    { icon: BookOpen, label: "Stock Ledger", path: "/staff/ledger" },
  ];

  return (
    <div className="w-72 bg-[#1F3A93] text-white min-h-screen p-6 flex flex-col shadow-xl">
      <div className="flex items-center gap-3 mb-10 px-2">
        <div className="bg-[#5DADE2] p-2 rounded-lg shadow-inner">
          <Package className="text-white" size={24} />
        </div>
        <div>
          <h1 className="text-xl font-bold tracking-tight">Smart Vyapari</h1>
          <p className="text-[10px] text-[#5DADE2] uppercase font-bold tracking-widest">Core Inventory</p>
        </div>
      </div>
      
      <nav className="space-y-1 flex-1">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = location.pathname === item.path;
          return (
            <Link
              key={item.label}
              to={item.path}
              className={`flex items-center gap-4 px-4 py-3 rounded-md transition-all duration-200 ${
                isActive 
                ? "bg-white text-[#1F3A93] shadow-lg font-bold" 
                : "text-blue-100 hover:bg-white/10 hover:pl-6"
              }`}
            >
              <Icon size={20} />
              <span className="text-sm">{item.label}</span>
            </Link>
          );
        })}
      </nav>

      <div className="pt-6 border-t border-white/10">
        <button className="flex items-center gap-4 px-4 py-3 rounded-md text-red-300 hover:bg-red-500/10 w-full transition-colors">
          <LogOut size={20} />
          <span className="text-sm font-medium">Logout</span>
        </button>
      </div>
    </div>
  );
}
import React from 'react';
import {
  AlertTriangle,
  ArrowDownToLine,
  Truck,
  ArrowLeftRight,
  Package,
  Clock,
  FileText
} from "lucide-react";

const StaffDashboard = () => {
  const kpiData = [
    { label: "Pending Receipts", value: "12", icon: ArrowDownToLine, color: "text-[#5DADE2]", bg: "bg-[#5DADE2]/10" },
    { label: "Pending Deliveries", value: "8", icon: Truck, color: "text-[#5DADE2]", bg: "bg-[#5DADE2]/10" },
    { label: "Internal Transfers Scheduled", value: "5", icon: ArrowLeftRight, color: "text-[#5DADE2]", bg: "bg-[#5DADE2]/10" },
    { label: "Total Products", value: "1,248", icon: Package, color: "text-[#2b4291]", bg: "bg-[#2b4291]/10" },
  ];

  const lowStockItems = [
    { sku: "SKU-001-2024", name: "Widget Pro 500", current: 5, min: 20, location: "Rack A-12", status: "Low Stock" },
    { sku: "SKU-023-2024", name: "Connector XL", current: 0, min: 15, location: "Rack B-05", status: "Out of Stock" },
    { sku: "SKU-045-2024", name: "Assembly Kit", current: 8, min: 25, location: "Rack C-08", status: "Low Stock" },
    { sku: "SKU-078-2024", name: "Mounting Bracket", current: 3, min: 30, location: "Rack D-15", status: "Low Stock" },
    { sku: "SKU-102-2024", name: "Cable Set Premium", current: 12, min: 40, location: "Rack A-20", status: "Low Stock" },
  ];

  return (
    <div className="p-6 space-y-6 bg-[#f8fafc] min-h-screen">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-[#2b4291]">Warehouse Dashboard</h1>
          <p className="text-slate-500 text-sm">Monitor operations and stock levels</p>
        </div>
        <select className="bg-white border border-slate-200 rounded-md px-3 py-2 text-sm shadow-sm outline-none">
          <option>Warehouse 1 - Main</option>
        </select>
      </div>

      {/* KPI Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {kpiData.map((kpi, i) => (
          <div key={i} className="bg-white p-5 border border-slate-100 rounded-xl shadow-sm flex justify-between items-center">
            <div>
              <p className="text-slate-500 text-[10px] font-bold uppercase tracking-wider">{kpi.label}</p>
              <p className={`text-3xl font-bold mt-1 ${kpi.color}`}>{kpi.value}</p>
            </div>
            <div className={`${kpi.bg} p-3 rounded-xl`}>
              <kpi.icon className={kpi.color} size={24} />
            </div>
          </div>
        ))}
      </div>

      {/* Low Stock Section */}
      <div className="bg-white rounded-xl border border-slate-100 shadow-sm overflow-hidden">
        <div className="p-4 bg-red-50/50 border-b border-red-100 flex items-center gap-3">
          <AlertTriangle className="text-red-500" size={20} />
          <h2 className="text-sm font-bold text-red-900">Low Stock / Out of Stock Alerts</h2>
        </div>
        <table className="w-full text-sm">
          <thead className="bg-slate-50 text-slate-400 font-bold uppercase text-[10px] tracking-widest">
            <tr>
              <th className="px-6 py-4 text-left">SKU</th>
              <th className="px-6 py-4 text-left">Product Name</th>
              <th className="px-6 py-4 text-center">Current</th>
              <th className="px-6 py-4 text-center">Min</th>
              <th className="px-6 py-4 text-left">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-50">
            {lowStockItems.map((item, idx) => (
              <tr key={idx} className="hover:bg-slate-50/50">
                <td className="px-6 py-4 font-mono text-blue-600">{item.sku}</td>
                <td className="px-6 py-4 font-medium text-slate-700">{item.name}</td>
                <td className={`px-6 py-4 text-center font-bold ${item.current === 0 ? 'text-red-500' : 'text-orange-500'}`}>{item.current}</td>
                <td className="px-6 py-4 text-center text-slate-400">{item.min}</td>
                <td className="px-6 py-4">
                  <span className={`px-2 py-1 rounded text-[10px] font-bold ${item.status === 'Out of Stock' ? 'bg-red-100 text-red-600' : 'bg-orange-100 text-orange-600'}`}>
                    {item.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Bottom Actions */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-xl border border-slate-100 shadow-sm">
          <h3 className="text-lg font-bold text-slate-800 mb-4">Quick Actions</h3>
          <div className="space-y-3">
            <button className="w-full bg-[#2b4291] text-white py-3 rounded-lg font-bold flex items-center justify-center gap-2 hover:bg-[#1e2e66]">
              <ArrowDownToLine size={18} /> New Receipt
            </button>
            <button className="w-full bg-[#5DADE2] text-white py-3 rounded-lg font-bold flex items-center justify-center gap-2 hover:bg-[#4aa0d5]">
              <Truck size={18} /> New Delivery Order
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StaffDashboard;
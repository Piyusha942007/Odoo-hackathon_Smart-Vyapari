import React from 'react';
import { 
  Download, Truck, ArrowLeftRight, Package, 
  AlertTriangle, Plus, ClipboardList, ChevronDown
} from 'lucide-react';

const StaffDashboard = () => {
  const lowStockItems = [
    { sku: 'SKU-001-2024', name: 'Widget Pro 500', stock: 5, min: 20, loc: 'Rack A-12', status: 'Low Stock' },
    { sku: 'SKU-023-2024', name: 'Connector XL', stock: 0, min: 15, loc: 'Rack B-05', status: 'Out of Stock' },
    { sku: 'SKU-045-2024', name: 'Assembly Kit', stock: 8, min: 25, loc: 'Rack C-08', status: 'Low Stock' },
    { sku: 'SKU-078-2024', name: 'Mounting Bracket', stock: 3, min: 30, loc: 'Rack D-15', status: 'Low Stock' },
    { sku: 'SKU-102-2024', name: 'Cable Set Premium', stock: 12, min: 40, loc: 'Rack A-20', status: 'Low Stock' },
  ];

  return (
    <div className="max-w-[1400px] mx-auto space-y-6">
      {/* Header */}
      <div className="flex justify-between items-start">
        <div>
          <h1 className="text-[26px] font-bold text-[#1e3a8a]">Warehouse Dashboard</h1>
          <p className="text-slate-500 text-sm mt-1">Monitor operations and stock levels</p>
        </div>
        <div className="relative">
          <select className="appearance-none bg-white border border-slate-200 text-slate-700 py-2 pl-4 pr-10 rounded-md text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
            <option>Warehouse 1 - Main</option>
          </select>
          <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-slate-400">
            <ChevronDown size={14} />
          </div>
        </div>
      </div>

      {/* Top Stats Cards */}
      <div className="grid grid-cols-4 gap-6">
        <StatCard title="Pending Receipts" value="12" icon={<Download size={24} />} iconBg="bg-[#38bdf8]" />
        <StatCard title="Pending Deliveries" value="8" icon={<Truck size={24} />} iconBg="bg-[#38bdf8]" />
        <StatCard title="Internal Transfers Scheduled" value="5" icon={<ArrowLeftRight size={24} />} iconBg="bg-[#38bdf8]" />
        <StatCard title="Total Products" value="1,248" icon={<Package size={24} />} iconBg="bg-[#1e3a8a]" />
      </div>

      {/* Low Stock Alert Section */}
      <div className="bg-white rounded-xl shadow-[0_2px_10px_-3px_rgba(6,81,237,0.1)] overflow-hidden border border-slate-100">
        <div className="bg-[#fff5f5] px-6 py-4 flex items-center gap-3 border-b border-red-100">
          <AlertTriangle className="text-red-500" size={24} />
          <div>
            <h3 className="font-bold text-[#1e3a8a] text-sm">Low Stock / Out of Stock Alerts</h3>
            <p className="text-xs text-slate-500">Items requiring immediate attention</p>
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-slate-100">
                <th className="text-left py-3 px-6 text-xs font-semibold text-[#1e3a8a] bg-white">SKU</th>
                <th className="text-left py-3 px-6 text-xs font-semibold text-[#1e3a8a] bg-white">Product Name</th>
                <th className="text-left py-3 px-6 text-xs font-semibold text-[#1e3a8a] bg-white">Current Stock</th>
                <th className="text-left py-3 px-6 text-xs font-semibold text-[#1e3a8a] bg-white">Min Required</th>
                <th className="text-left py-3 px-6 text-xs font-semibold text-[#1e3a8a] bg-white">Location</th>
                <th className="text-left py-3 px-6 text-xs font-semibold text-[#1e3a8a] bg-white">Status</th>
              </tr>
            </thead>
            <tbody>
              {lowStockItems.map((item, idx) => (
                <tr key={idx} className="border-b border-slate-50 last:border-0 hover:bg-slate-50">
                  <td className="py-4 px-6 text-sm font-semibold text-[#1e3a8a]">{item.sku}</td>
                  <td className="py-4 px-6 text-sm text-slate-600 font-medium">{item.name}</td>
                  <td className={`py-4 px-6 text-sm font-bold ${item.stock === 0 ? 'text-red-500' : 'text-orange-500'}`}>
                    {item.stock}
                  </td>
                  <td className="py-4 px-6 text-sm text-slate-500">{item.min}</td>
                  <td className="py-4 px-6 text-sm text-slate-600">{item.loc}</td>
                  <td className="py-4 px-6">
                    {item.status === 'Low Stock' ? (
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md text-xs font-semibold bg-orange-100 text-orange-700 border border-orange-200">
                        <AlertTriangle size={12} /> Low Stock
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md text-xs font-semibold bg-red-100 text-red-700 border border-red-200">
                        <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 17h8m0 0V9m0 8l-8-8-4 4-6-6" />
                        </svg>
                        Out of Stock
                      </span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Bottom Grid */}
      <div className="grid grid-cols-2 gap-6">
        <div className="bg-white rounded-xl shadow-[0_2px_10px_-3px_rgba(6,81,237,0.1)] p-6 border border-slate-100">
          <h3 className="text-lg font-bold text-[#1e3a8a] mb-4">Recent Activity</h3>
          <div className="space-y-0">
            <ActivityItem type="Receipt" id="RCP-2024-0156" time="10 mins ago" status="Ready" />
            <ActivityItem type="Delivery" id="DEL-2024-0289" time="25 mins ago" status="Done" />
            <ActivityItem type="Transfer" id="TRF-2024-0421" time="1 hour ago" status="Waiting" />
            <ActivityItem type="Adjustment" id="ADJ-2024-0087" time="2 hours ago" status="Done" isLast />
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-[0_2px_10px_-3px_rgba(6,81,237,0.1)] p-6 border border-slate-100">
          <h3 className="text-lg font-bold text-[#1e3a8a] mb-4">Quick Actions</h3>
          <div className="space-y-3">
            <button className="w-full flex justify-center items-center gap-2 py-3.5 bg-[#1e3a8a] hover:bg-blue-900 text-white rounded-md font-semibold text-sm transition-colors shadow-sm">
              <Download size={18} /> New Receipt
            </button>
            <button className="w-full flex justify-center items-center gap-2 py-3.5 bg-[#4cb3ed] hover:bg-sky-500 text-white rounded-md font-semibold text-sm transition-colors shadow-sm">
              <Truck size={18} /> New Delivery Order
            </button>
            <button className="w-full flex justify-center items-center gap-2 py-3.5 bg-[#2545ac] hover:bg-[#1a3592] text-white rounded-md font-semibold text-sm transition-colors shadow-sm">
              <ArrowLeftRight size={18} /> Internal Transfer
            </button>
            <button className="w-full flex justify-center items-center gap-2 py-3.5 bg-[#8799a8] hover:bg-slate-500 text-white rounded-md font-semibold text-sm transition-colors shadow-sm">
              <ClipboardList size={18} /> Inventory Adjustment
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

// Helper Components
const StatCard = ({ title, value, icon, iconBg }) => (
  <div className="bg-white rounded-xl shadow-[0_2px_10px_-3px_rgba(6,81,237,0.1)] p-6 flex justify-between items-start border border-slate-100">
    <div>
      <h3 className="text-slate-500 text-sm font-medium">{title}</h3>
      <div className="text-[32px] font-bold text-[#1e3a8a] mt-1 leading-none tracking-tight">{value}</div>
    </div>
    <div className={`w-12 h-12 rounded-lg flex items-center justify-center text-white ${iconBg} shadow-sm`}>
      {icon}
    </div>
  </div>
);

const ActivityItem = ({ type, id, time, status, isLast }) => {
  const getStatusColor = (s) => {
    switch(s) {
      case 'Ready': return 'bg-blue-100 text-blue-700 border-blue-200';
      case 'Done': return 'bg-emerald-100 text-emerald-700 border-emerald-200';
      case 'Waiting': return 'bg-amber-100 text-amber-700 border-amber-200';
      default: return 'bg-slate-100 text-slate-700 border-slate-200';
    }
  };

  return (
    <div className={`flex justify-between items-center py-4 ${!isLast ? 'border-b border-slate-100' : ''}`}>
      <div>
        <div className="text-sm font-semibold text-[#1e3a8a]">{type}</div>
        <div className="text-xs text-slate-500 mt-1">{id}</div>
      </div>
      <div className="text-right">
        <span className={`inline-flex items-center px-2.5 py-0.5 rounded text-xs font-semibold border ${getStatusColor(status)}`}>
          {status}
        </span>
        <div className="text-xs text-slate-400 mt-1">{time}</div>
      </div>
    </div>
  );
};

export default StaffDashboard;
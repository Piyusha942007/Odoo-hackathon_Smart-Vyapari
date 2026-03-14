import React from 'react';
import { ClipboardList, Search, Plus, TrendingDown, TrendingUp } from 'lucide-react';

const StaffInventoryAdjustments = () => {
  const adjustments = [
    {
      id: "ADJ-2024-0087",
      product: "Widget Pro 500",
      sku: "SKU-001-2024",
      location: "Rack A-12",
      recorded: 100,
      physical: 95,
      difference: -5,
      reason: "Physical count discrepancy",
      adjustedBy: "John Doe",
      date: "2024-03-14",
    },
    {
      id: "ADJ-2024-0088",
      product: "Connector XL",
      sku: "SKU-023-2024",
      location: "Rack B-05",
      recorded: 150,
      physical: 155,
      difference: 5,
      reason: "Inventory recount",
      adjustedBy: "Jane Smith",
      date: "2024-03-15",
    },
    {
      id: "ADJ-2024-0089",
      product: "Assembly Kit",
      sku: "SKU-045-2024",
      location: "Rack C-08",
      recorded: 200,
      physical: 185,
      difference: -15,
      reason: "Damaged goods removed",
      adjustedBy: "Mike Johnson",
      date: "2024-03-15",
    }
  ];

  const getDifferenceStyle = (diff) => {
    if (diff > 0) {
      return "bg-emerald-100 text-emerald-700 border-emerald-200";
    }
    if (diff < 0) {
      return "bg-red-100 text-red-700 border-red-200";
    }
    return "bg-slate-100 text-slate-700 border-slate-200";
  };

  return (
    <div className="mx-auto space-y-6">
      {/* Header */}
      <div className="flex justify-between items-start">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 bg-[#4cb3ed] rounded-xl flex items-center justify-center text-white shadow-sm">
            <ClipboardList size={24} />
          </div>
          <div>
            <h1 className="text-[26px] font-bold text-[#1e3a8a] leading-tight">Inventory Adjustments</h1>
            <p className="text-slate-500 text-sm mt-0.5">Reconcile physical counts with system records</p>
          </div>
        </div>
        <button className="flex items-center gap-2 bg-[#1e3a8a] hover:bg-blue-900 text-white px-4 py-2.5 rounded-md font-semibold text-sm shadow-sm transition-colors">
          <Plus size={18} /> New Adjustment
        </button>
      </div>

      {/* Toolbar */}
      <div className="flex gap-4 items-center">
        <div className="relative flex-1">
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">
            <Search size={16} />
          </span>
          <input 
            type="text" 
            placeholder="Search adjustments, products, or SKU..." 
            className="w-full bg-white border border-slate-200 text-slate-800 text-sm py-2.5 pl-9 pr-4 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-sm"
          />
        </div>
      </div>

      {/* Data Table */}
      <div className="bg-white rounded-xl shadow-[0_2px_10px_-3px_rgba(6,81,237,0.1)] overflow-hidden border border-slate-100">
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="bg-[#1e3a8a] text-white">
              <tr>
                <th className="px-6 py-4 font-semibold text-[13px] tracking-wide">Adjustment ID</th>
                <th className="px-6 py-4 font-semibold text-[13px] tracking-wide">Product / SKU</th>
                <th className="px-6 py-4 font-semibold text-[13px] tracking-wide">Location</th>
                <th className="px-6 py-4 font-semibold text-[13px] tracking-wide">Recorded</th>
                <th className="px-6 py-4 font-semibold text-[13px] tracking-wide text-center">Physical</th>
                <th className="px-6 py-4 font-semibold text-[13px] tracking-wide text-center">Difference</th>
                <th className="px-6 py-4 font-semibold text-[13px] tracking-wide">Reason</th>
                <th className="px-6 py-4 font-semibold text-[13px] tracking-wide">Adjusted By</th>
                <th className="px-6 py-4 font-semibold text-[13px] tracking-wide">Date</th>
              </tr>
            </thead>
            <tbody>
              {adjustments.map((adj) => (
                <tr key={adj.id} className="border-b border-slate-100 hover:bg-slate-50 transition-colors last:border-0 hover:shadow-sm">
                  <td className="px-6 py-4 font-bold text-[#1e3a8a]">
                    {adj.id}
                  </td>
                  <td className="px-6 py-4">
                    <div className="font-bold text-[#1e3a8a]">{adj.product}</div>
                    <div className="text-xs text-slate-400 mt-0.5">{adj.sku}</div>
                  </td>
                  <td className="px-6 py-4 font-medium text-slate-700">
                    {adj.location}
                  </td>
                  <td className="px-6 py-4 font-bold text-slate-700">
                    {adj.recorded}
                  </td>
                  <td className="px-6 py-4 font-bold text-[#1e3a8a] text-center">
                    {adj.physical}
                  </td>
                  <td className="px-6 py-4 text-center">
                    <span className={`inline-flex items-center gap-1 px-3 py-1 rounded text-xs font-bold border ${getDifferenceStyle(adj.difference)}`}>
                      {adj.difference > 0 ? <TrendingUp size={12} /> : <TrendingDown size={12} />}
                      {adj.difference > 0 ? `+${adj.difference}` : adj.difference}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-slate-500 text-xs">
                    {adj.reason}
                  </td>
                  <td className="px-6 py-4 text-slate-600 font-medium">
                    {adj.adjustedBy}
                  </td>
                  <td className="px-6 py-4 text-slate-600">
                    {adj.date}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default StaffInventoryAdjustments;

import React from 'react';
import { ArrowLeftRight, Search, ChevronDown, CheckCircle, Plus, ArrowRight } from 'lucide-react';

const StaffInternalTransfers = () => {
  const transfers = [
    {
      id: "TRF-2024-0421",
      product: "Widget Pro 500",
      sku: "SKU-001-2024",
      quantity: 50,
      from: "Rack A-12",
      to: "Rack B-15",
      scheduled: "2024-03-15",
      status: "Ready",
    },
    {
      id: "TRF-2024-0422",
      product: "Connector XL",
      sku: "SKU-023-2024",
      quantity: 100,
      from: "Rack B-05",
      to: "Warehouse 2 - Rack A-01",
      scheduled: "2024-03-15",
      status: "Waiting",
    },
    {
      id: "TRF-2024-0423",
      product: "Assembly Kit",
      sku: "SKU-045-2024",
      quantity: 75,
      from: "Rack C-08",
      to: "Rack C-20",
      scheduled: "2024-03-16",
      status: "Draft",
    },
    {
      id: "TRF-2024-0420",
      product: "Mounting Bracket",
      sku: "SKU-078-2024",
      quantity: 200,
      from: "Rack D-15",
      to: "Rack A-05",
      scheduled: "2024-03-14",
      status: "Done",
    }
  ];

  const getStatusStyle = (status) => {
    switch (status) {
      case 'Ready': return 'bg-blue-100 text-blue-700 border border-blue-200';
      case 'Waiting': return 'bg-amber-100 text-amber-700 border border-amber-200';
      case 'Draft': return 'bg-slate-100 text-slate-700 border border-slate-200';
      case 'Done': return 'bg-emerald-100 text-emerald-700 border border-emerald-200';
      default: return 'bg-slate-100 text-slate-700 border border-slate-200';
    }
  };

  return (
    <div className="mx-auto space-y-6">
      {/* Header */}
      <div className="flex justify-between items-start">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 bg-[#4cb3ed] rounded-xl flex items-center justify-center text-white shadow-sm">
            <ArrowLeftRight size={24} />
          </div>
          <div>
            <h1 className="text-[26px] font-bold text-[#1e3a8a] leading-tight">Internal Transfers</h1>
            <p className="text-slate-500 text-sm mt-0.5">Move inventory between locations</p>
          </div>
        </div>
        <button className="flex items-center gap-2 bg-[#1e3a8a] hover:bg-blue-900 text-white px-4 py-2.5 rounded-md font-semibold text-sm shadow-sm transition-colors">
          <Plus size={18} /> New Transfer
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
            placeholder="Search transfers, products, or SKU..." 
            className="w-full bg-white border border-slate-200 text-slate-800 text-sm py-2.5 pl-9 pr-4 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-sm"
          />
        </div>
        
        <div className="w-48 relative shrink-0">
          <select className="w-full appearance-none bg-white border border-slate-200 text-slate-700 py-2.5 pl-4 pr-10 rounded-md text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500">
            <option>All Statuses</option>
            <option>Ready</option>
            <option>Waiting</option>
            <option>Draft</option>
            <option>Done</option>
          </select>
          <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-slate-400">
            <ChevronDown size={14} />
          </div>
        </div>
      </div>

      {/* Data Table */}
      <div className="bg-white rounded-xl shadow-[0_2px_10px_-3px_rgba(6,81,237,0.1)] overflow-hidden border border-slate-100">
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="bg-[#1e3a8a] text-white">
              <tr>
                <th className="px-6 py-4 font-semibold text-[13px] tracking-wide">Transfer ID</th>
                <th className="px-6 py-4 font-semibold text-[13px] tracking-wide">Product / SKU</th>
                <th className="px-6 py-4 font-semibold text-[13px] tracking-wide">Quantity</th>
                <th className="px-6 py-4 font-semibold text-[13px] tracking-wide">Movement</th>
                <th className="px-6 py-4 font-semibold text-[13px] tracking-wide">Scheduled</th>
                <th className="px-6 py-4 font-semibold text-[13px] tracking-wide">Status</th>
                <th className="px-6 py-4 font-semibold text-[13px] tracking-wide">Actions</th>
              </tr>
            </thead>
            <tbody>
              {transfers.map((transfer) => (
                <tr key={transfer.id} className="border-b border-slate-100 hover:bg-slate-50 transition-colors last:border-0">
                  <td className="px-6 py-4 font-bold text-[#1e3a8a]">
                    {transfer.id}
                  </td>
                  <td className="px-6 py-4">
                    <div className="font-bold text-[#1e3a8a]">{transfer.product}</div>
                    <div className="text-xs text-slate-400 mt-0.5">{transfer.sku}</div>
                  </td>
                  <td className="px-6 py-4 font-bold text-[#1e3a8a]">
                    {transfer.quantity}
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2 text-slate-600 text-xs font-medium">
                      <span>{transfer.from}</span>
                      <ArrowRight size={12} className="text-slate-400" />
                      <span>{transfer.to}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-slate-600">
                    {transfer.scheduled}
                  </td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex px-3 py-1 rounded-md text-xs font-bold ${getStatusStyle(transfer.status)}`}>
                      {transfer.status}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      {transfer.status === 'Ready' && (
                        <button className="flex items-center gap-1.5 bg-[#10b981] hover:bg-emerald-600 text-white px-3 py-1.5 rounded-md text-xs font-semibold transition-colors shadow-sm">
                          <CheckCircle size={14} /> Execute
                        </button>
                      )}
                      <button className="bg-white hover:bg-slate-50 text-slate-700 border border-slate-200 px-3 py-1.5 rounded-md text-xs font-semibold shadow-sm transition-colors">
                        View
                      </button>
                    </div>
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

export default StaffInternalTransfers;
